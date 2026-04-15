import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildNixFmtCommand } from '~/code/tool/shared/format/command'

export const formatNixConsole = buildFormatConsole({
  language: 'nix',
  describe: 'Format Nix source (nixpkgs-fmt)',
  builder: buildNixFmtCommand,
  examples: [
    { comment: 'in-place', command: 'task format nix flake.nix' },
    { comment: 'check',    command: 'task format nix flake.nix --check' },
  ],
})
