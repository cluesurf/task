# Render a template file by substituting __TOKENS__. Each argument
# is a `KEY=VALUE` pair; every literal `__KEY__` in the template is
# replaced with VALUE. Values may contain newlines.
#
# Usage:
#   render_template path/to/template.in path/to/out \
#     VERSION="$(meta_version)" \
#     DEPS="$(deps_for deb ", ")"

render_template() {
  local in="$1" out="$2"
  shift 2
  local content
  content="$(cat "$in")"
  local arg key val
  for arg in "$@"; do
    key="${arg%%=*}"
    val="${arg#*=}"
    # Use awk so multi-line values survive without shell quoting games.
    content=$(KEY="__${key}__" VAL="$val" awk '
      BEGIN { k=ENVIRON["KEY"]; v=ENVIRON["VAL"]; rlen=length(k) }
      {
        line=$0; out=""
        while ((p=index(line,k))>0) {
          out=out substr(line,1,p-1) v
          line=substr(line,p+rlen)
        }
        print out line
      }' <<< "$content")
  done
  printf '%s\n' "$content" > "$out"
}
