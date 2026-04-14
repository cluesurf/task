import { Form } from '@cluesurf/form'

/**
 * Top-level `task.archive({...})` input. The router in `./node.ts`
 * inspects `output.format` (and optional `tool` override) and
 * dispatches to the matching per-tool builder in
 * `./<tool>/command.ts`. Re-exports the tool-specific schemas so
 * the codegen picks them up.
 */
export const archive: Form = {
  form: 'form',
  save: '~/code/form/action/archive',
  link: {
    tool: { like: 'archive_tool', need: false },
    input: {
      link: {
        path: { like: 'string' },
      },
    },
    output: {
      link: {
        format: { like: 'archive_format', name: { mark: 'O' } },
        file: {
          link: { path: { like: 'string' } },
        },
      },
    },
  },
}

export * from './zip/base'
export * from './rar/base'
export * from './sevenzip/base'
export * from './tar/base'
export * from './atool/base'
export * from './patool/base'
