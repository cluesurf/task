import { Form, Hash, List } from '@termsurf/form'

export const puppeteer_life_cycle_event: List = {
  form: 'list',
  list: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
}

export const puppeteer_input_format: List = {
  form: 'list',
  list: ['html'],
}

export const puppeteer_output_format: List = {
  form: 'list',
  list: ['pdf', 'png'],
}

export const puppeteer_txt_input_format: List = {
  form: 'list',
  list: ['txt'],
}

export const puppeteer_markdown_input_format: List = {
  form: 'list',
  list: ['md'],
}

export const puppeteer_life_cycle_event_data: Form = {
  form: 'form',
  link: {
    note: { like: 'string' },
  },
}

export const puppeteer_life_cycle_event_content: Hash = {
  form: 'hash',
  link: 'puppeteer_life_cycle_event',
  bond: {
    like: 'puppeteer_life_cycle_event_data',
  },
  hash: {
    load: { note: `Waits for the 'load' event.` },
    domcontentloaded: {
      note: `Waits for the 'DOMContentLoaded' event.`,
    },
    networkidle0: {
      note: `Waits till there are no more than 0 network connections for at least 500 ms.`,
    },
    networkidle2: {
      note: `Waits till there are no more than 2 network connections for at least 500 ms.`,
    },
  },
}
