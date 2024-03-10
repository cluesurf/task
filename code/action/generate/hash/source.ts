import { Form, List } from '@termsurf/form'

export const forge_message_digest: List = {
  form: 'list',
  list: [
    'sha1',
    'sha256',
    'sha384',
    'sha512',
    'sha512/224',
    'sha512/256',
  ],
}

export const generate_hash: Form = {
  form: 'form',
  link: {
    class: { like: 'forge_message_digest' },
    content: {
      case: [{ like: 'string' }, { like: 'array_buffer' }],
    },
  },
}
