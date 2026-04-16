import { Form } from '@cluesurf/form'

export const convert_time_zone: Form = {
  form: 'form',
  save: '~/code/form/action/convert/time-zone',
  link: {
    input: {
      link: {
        date: { like: 'string', name: { mark: 'i' } },
      },
    },
    output: {
      link: {
        timezone: { like: 'time_zone', name: { mark: 'O' } },
        format: { like: 'string', name: { mark: 'T' } },
      },
    },
  },
}
