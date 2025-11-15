import { CliLogFormat } from '~/code/form/object/cli-log/index'

export type CompileCliBase = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  output: {
    format: string
    file: {
      path: string
    }
  }
  help?: boolean
  log?: CliLogFormat
}
export type ConvertCliBase = {
  input: {
    format: string
    file: {
      path: string
    }
  }
  output: {
    format: string
    file: {
      path: string
    }
  }
  help?: boolean
  log?: CliLogFormat
}
export type FormatCliBase = {
  format: string
  input: {
    file: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
  help?: boolean
  log?: CliLogFormat
}
export type VerifyCliBase = {
  format: string
  file: {
    path: string
  }
  help?: boolean
  log?: CliLogFormat
}
