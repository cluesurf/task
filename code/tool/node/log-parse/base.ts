/**
 * Log-line parsers for `task parse log`, `task aggregate log`,
 * and `task highlight log`. Handles three shapes that cover
 * ~90% of lines we see in the wild:
 *
 *   1. JSON-per-line (structured logs from node, go, rust apps)
 *   2. nginx / apache combined log format
 *   3. syslog (`<date> <host> <program>[<pid>]: <message>`)
 *
 * Parsers return `undefined` on a non-match so the caller can
 * fall through a chain. The dispatcher below tries each shape
 * in order; falls back to `{ message }` for unparseable lines so
 * downstream aggregation / highlighting still has SOMETHING to
 * work with.
 */

export type LogEntry = {
  time?: string
  level?: string
  host?: string
  method?: string
  path?: string
  status?: number
  bytes?: number
  referer?: string
  userAgent?: string
  ip?: string
  program?: string
  pid?: number
  message?: string
  raw: string
  /** Any extra fields from JSON-per-line logs that don't map to
   *  the canonical slots above. */
  extra?: Record<string, unknown>
}

export function parseLogLine(line: string): LogEntry {
  const trimmed = line.trim()
  if (!trimmed) return { raw: line }
  return (
    parseJson(trimmed) ??
    parseNginx(trimmed) ??
    parseSyslog(trimmed) ?? { raw: line, message: trimmed }
  )
}

// ---- JSON-per-line ------------------------------------------------

function parseJson(line: string): LogEntry | undefined {
  if (!line.startsWith('{')) return undefined
  try {
    const obj = JSON.parse(line) as Record<string, unknown>
    const entry: LogEntry = { raw: line }
    const extra: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      const lower = key.toLowerCase()
      if (lower === 'time' || lower === 'timestamp' || lower === 'ts' || lower === '@timestamp') {
        entry.time = String(value)
      } else if (lower === 'level' || lower === 'severity' || lower === 'lvl') {
        entry.level = String(value).toLowerCase()
      } else if (lower === 'msg' || lower === 'message') {
        entry.message = String(value)
      } else if (lower === 'status') {
        entry.status = Number(value)
      } else if (lower === 'method') {
        entry.method = String(value)
      } else if (lower === 'path' || lower === 'url') {
        entry.path = String(value)
      } else if (lower === 'host' || lower === 'hostname') {
        entry.host = String(value)
      } else {
        extra[key] = value
      }
    }
    if (Object.keys(extra).length > 0) entry.extra = extra
    return entry
  } catch {
    return undefined
  }
}

// ---- nginx / apache combined --------------------------------------

/**
 * Combined Log Format:
 *
 *   %h %l %u %t "%r" %>s %b "%{Referer}i" "%{User-Agent}i"
 *   127.0.0.1 - - [14/Apr/2026:10:00:00 +0000] "GET /x HTTP/1.1" 200 1234 "-" "curl/8"
 *
 * We capture the bits people actually aggregate on — method, path,
 * status, bytes — and drop everything else onto `raw`.
 */
const NGINX_RX =
  /^(\S+) \S+ \S+ \[([^\]]+)\] "(\S+) (\S+) \S+" (\d+) (\d+|-)(?:\s+"([^"]*)"\s+"([^"]*)")?/

function parseNginx(line: string): LogEntry | undefined {
  const match = line.match(NGINX_RX)
  if (!match) return undefined
  const [, ip, time, method, path, status, bytes, referer, userAgent] = match
  return {
    raw: line,
    ip,
    time,
    method,
    path,
    status: Number(status),
    bytes: bytes === '-' ? 0 : Number(bytes),
    referer,
    userAgent,
  }
}

// ---- syslog -------------------------------------------------------

/**
 * Classic syslog:
 *
 *   Apr 14 10:00:00 hostname program[pid]: message
 */
const SYSLOG_RX =
  /^([A-Z][a-z]{2}\s+\d{1,2}\s+\d{2}:\d{2}:\d{2})\s+(\S+)\s+(\S+?)(?:\[(\d+)\])?:\s+(.*)$/

function parseSyslog(line: string): LogEntry | undefined {
  const match = line.match(SYSLOG_RX)
  if (!match) return undefined
  const [, time, host, program, pid, message] = match
  return {
    raw: line,
    time,
    host,
    program,
    pid: pid ? Number(pid) : undefined,
    message,
  }
}
