import { Form, List } from '@termsurf/form'
import {
  buildConvertForms,
  buildConvertFormsToStringContent,
  buildConvertFormsWithOutputDirectory,
} from '~/code/tool/shared/source.js'

const convert_document_with_jupyter_forms = buildConvertForms(
  'convert_document_with_jupyter',
  'string',
  'string',
)

export const convert_document_with_jupyter_command_input =
  convert_document_with_jupyter_forms.command_input

export const convert_document_with_jupyter_node_input =
  convert_document_with_jupyter_forms.node_input

export const convert_document_with_jupyter_node_remote_input =
  convert_document_with_jupyter_forms.node_remote_input

export const convert_document_with_jupyter_node_external_input =
  convert_document_with_jupyter_forms.node_external_input

export const convert_document_with_jupyter_node_client_input =
  convert_document_with_jupyter_forms.node_client_input

export const convert_document_with_jupyter_node_local_external_input =
  convert_document_with_jupyter_forms.node_local_external_input

export const convert_document_with_jupyter_node_local_internal_input =
  convert_document_with_jupyter_forms.node_local_internal_input

export const convert_document_with_jupyter_node_local_input =
  convert_document_with_jupyter_forms.node_local_input

export const convert_document_with_jupyter_node_output =
  convert_document_with_jupyter_forms.node_output

export const convert_document_with_jupyter_browser_input =
  convert_document_with_jupyter_forms.browser_input

export const convert_document_with_jupyter_browser_remote_input =
  convert_document_with_jupyter_forms.browser_remote_input

export const convert_document_with_jupyter_browser_local_input =
  convert_document_with_jupyter_forms.browser_local_input

export const convert_document_with_jupyter_browser_output =
  convert_document_with_jupyter_forms.browser_output

const convert_document_with_libre_office_forms =
  buildConvertFormsWithOutputDirectory(
    'convert_document_with_libre_office',
    'libre_office_input_format',
    'libre_office_output_format',
  )

export const convert_document_with_libre_office_command_input =
  convert_document_with_libre_office_forms.command_input

export const convert_document_with_libre_office_node_input =
  convert_document_with_libre_office_forms.node_input

export const convert_document_with_libre_office_node_remote_input =
  convert_document_with_libre_office_forms.node_remote_input

export const convert_document_with_libre_office_node_external_input =
  convert_document_with_libre_office_forms.node_external_input

export const convert_document_with_libre_office_node_client_input =
  convert_document_with_libre_office_forms.node_client_input

export const convert_document_with_libre_office_node_local_external_input =
  convert_document_with_libre_office_forms.node_local_external_input

export const convert_document_with_libre_office_node_local_internal_input =
  convert_document_with_libre_office_forms.node_local_internal_input

export const convert_document_with_libre_office_node_local_input =
  convert_document_with_libre_office_forms.node_local_input

export const convert_document_with_libre_office_node_output =
  convert_document_with_libre_office_forms.node_output

export const convert_document_with_libre_office_browser_input =
  convert_document_with_libre_office_forms.browser_input

export const convert_document_with_libre_office_browser_remote_input =
  convert_document_with_libre_office_forms.browser_remote_input

export const convert_document_with_libre_office_browser_local_input =
  convert_document_with_libre_office_forms.browser_local_input

export const convert_document_with_libre_office_browser_output =
  convert_document_with_libre_office_forms.browser_output

export const pdf_latex_input_format: List = {
  form: 'list',
  list: ['tex'],
}

export const pdf_latex_output_format: List = {
  form: 'list',
  list: ['pdf'],
}

const convert_latex_with_pdf_latex_forms =
  buildConvertFormsWithOutputDirectory(
    'convert_latex_with_pdf_latex',
    'pdf_latex_input_format',
    'pdf_latex_output_format',
  )

export const convert_latex_with_pdf_latex_command_input =
  convert_latex_with_pdf_latex_forms.command_input

export const convert_latex_with_pdf_latex_node_input =
  convert_latex_with_pdf_latex_forms.node_input

export const convert_latex_with_pdf_latex_node_remote_input =
  convert_latex_with_pdf_latex_forms.node_remote_input

export const convert_latex_with_pdf_latex_node_external_input =
  convert_latex_with_pdf_latex_forms.node_external_input

export const convert_latex_with_pdf_latex_node_client_input =
  convert_latex_with_pdf_latex_forms.node_client_input

export const convert_latex_with_pdf_latex_node_local_external_input =
  convert_latex_with_pdf_latex_forms.node_local_external_input

export const convert_latex_with_pdf_latex_node_local_internal_input =
  convert_latex_with_pdf_latex_forms.node_local_internal_input

export const convert_latex_with_pdf_latex_node_local_input =
  convert_latex_with_pdf_latex_forms.node_local_input

export const convert_latex_with_pdf_latex_node_output =
  convert_latex_with_pdf_latex_forms.node_output

export const convert_latex_with_pdf_latex_browser_input =
  convert_latex_with_pdf_latex_forms.browser_input

export const convert_latex_with_pdf_latex_browser_remote_input =
  convert_latex_with_pdf_latex_forms.browser_remote_input

export const convert_latex_with_pdf_latex_browser_local_input =
  convert_latex_with_pdf_latex_forms.browser_local_input

export const convert_latex_with_pdf_latex_browser_output =
  convert_latex_with_pdf_latex_forms.browser_output

export const convert_latex_to_png_input_format: List = {
  form: 'list',
  list: ['tex'],
}

export const convert_latex_to_png_output_format: List = {
  form: 'list',
  list: ['png'],
}

const convert_latex_to_png_forms = buildConvertForms(
  'convert_latex_to_png',
  'convert_latex_to_png_input_format',
  'convert_latex_to_png_output_format',
)

export const convert_latex_to_png_command_input =
  convert_latex_to_png_forms.command_input

export const convert_latex_to_png_node_input =
  convert_latex_to_png_forms.node_input

export const convert_latex_to_png_node_remote_input =
  convert_latex_to_png_forms.node_remote_input

export const convert_latex_to_png_node_external_input =
  convert_latex_to_png_forms.node_external_input

export const convert_latex_to_png_node_client_input =
  convert_latex_to_png_forms.node_client_input

export const convert_latex_to_png_node_local_external_input =
  convert_latex_to_png_forms.node_local_external_input

export const convert_latex_to_png_node_local_internal_input =
  convert_latex_to_png_forms.node_local_internal_input

export const convert_latex_to_png_node_local_input =
  convert_latex_to_png_forms.node_local_input

export const convert_latex_to_png_node_output =
  convert_latex_to_png_forms.node_output

export const convert_latex_to_png_browser_input =
  convert_latex_to_png_forms.browser_input

export const convert_latex_to_png_browser_remote_input =
  convert_latex_to_png_forms.browser_remote_input

export const convert_latex_to_png_browser_local_input =
  convert_latex_to_png_forms.browser_local_input

export const convert_latex_to_png_browser_output =
  convert_latex_to_png_forms.browser_output

const convert_document_with_calibre_forms = buildConvertForms(
  'convert_document_with_calibre',
  'calibre_input_format',
  'calibre_output_format',
)

export const convert_document_with_calibre_command_input =
  convert_document_with_calibre_forms.command_input

export const convert_document_with_calibre_node_input =
  convert_document_with_calibre_forms.node_input

export const convert_document_with_calibre_node_remote_input =
  convert_document_with_calibre_forms.node_remote_input

export const convert_document_with_calibre_node_external_input =
  convert_document_with_calibre_forms.node_external_input

export const convert_document_with_calibre_node_client_input =
  convert_document_with_calibre_forms.node_client_input

export const convert_document_with_calibre_node_local_external_input =
  convert_document_with_calibre_forms.node_local_external_input

export const convert_document_with_calibre_node_local_internal_input =
  convert_document_with_calibre_forms.node_local_internal_input

export const convert_document_with_calibre_node_local_input =
  convert_document_with_calibre_forms.node_local_input

export const convert_document_with_calibre_node_output =
  convert_document_with_calibre_forms.node_output

export const convert_document_with_calibre_browser_input =
  convert_document_with_calibre_forms.browser_input

export const convert_document_with_calibre_browser_remote_input =
  convert_document_with_calibre_forms.browser_remote_input

export const convert_document_with_calibre_browser_local_input =
  convert_document_with_calibre_forms.browser_local_input

export const convert_document_with_calibre_browser_output =
  convert_document_with_calibre_forms.browser_output

const convert_html_with_puppeteer_forms = buildConvertForms(
  'convert_html_with_puppeteer',
  'puppeteer_input_format',
  'puppeteer_output_format',
  {
    viewport: {
      link: {
        width: { like: 'natural_number', need: false },
        height: { like: 'natural_number', need: false },
      },
    },
    proxy: { like: 'string', need: false },
    waitUntil: { like: 'puppeteer_life_cycle_event', need: false },
  },
)

export const convert_html_with_puppeteer_command_input =
  convert_html_with_puppeteer_forms.command_input

export const convert_html_with_puppeteer_node_input =
  convert_html_with_puppeteer_forms.node_input

export const convert_html_with_puppeteer_node_remote_input =
  convert_html_with_puppeteer_forms.node_remote_input

export const convert_html_with_puppeteer_node_external_input =
  convert_html_with_puppeteer_forms.node_external_input

export const convert_html_with_puppeteer_node_client_input =
  convert_html_with_puppeteer_forms.node_client_input

export const convert_html_with_puppeteer_node_local_external_input =
  convert_html_with_puppeteer_forms.node_local_external_input

export const convert_html_with_puppeteer_node_local_internal_input =
  convert_html_with_puppeteer_forms.node_local_internal_input

export const convert_html_with_puppeteer_node_local_input =
  convert_html_with_puppeteer_forms.node_local_input

export const convert_html_with_puppeteer_node_output =
  convert_html_with_puppeteer_forms.node_output

export const convert_html_with_puppeteer_browser_input =
  convert_html_with_puppeteer_forms.browser_input

export const convert_html_with_puppeteer_browser_remote_input =
  convert_html_with_puppeteer_forms.browser_remote_input

export const convert_html_with_puppeteer_browser_local_input =
  convert_html_with_puppeteer_forms.browser_local_input

export const convert_html_with_puppeteer_browser_output =
  convert_html_with_puppeteer_forms.browser_output

export const text_style: Form = {
  form: 'form',
  link: {
    color: {
      like: 'string',
      test: 'is_hex_color_6',
      need: false,
    },
    bold: { like: 'boolean', need: false, fall: false },
    italic: { like: 'boolean', need: false, fall: false },
    font: {
      need: false,
      link: {
        size: { like: 'natural_number', need: false },
        family: { like: 'string', list: true, need: false },
      },
    },
    lineHeight: { like: 'decimal', need: false },
    letterSpacing: { like: 'decimal', need: false },
    allCaps: { like: 'boolean', need: false, fall: false },
  },
}

const margin = {
  need: false,
  link: {
    x: { like: 'natural_number', need: false },
    y: { like: 'natural_number', need: false },
  },
}

const convert_txt_with_puppeteer_forms =
  buildConvertFormsToStringContent(
    'convert_txt_with_puppeteer',
    'puppeteer_txt_input_format',
    'puppeteer_output_format',
    {
      viewport: {
        need: false,
        link: {
          width: { like: 'natural_number', need: false },
          height: { like: 'natural_number', need: false },
        },
      },
      proxy: { like: 'string', need: false },
      waitUntil: { like: 'puppeteer_life_cycle_event', need: false },
      style: {
        need: false,
        link: {
          margin,
          text: { like: 'text_style' },
        },
      },
    },
  )

export const convert_txt_with_puppeteer_node_input =
  convert_txt_with_puppeteer_forms.node_input

export const convert_txt_with_puppeteer_node_remote_input =
  convert_txt_with_puppeteer_forms.node_remote_input

export const convert_txt_with_puppeteer_node_external_input =
  convert_txt_with_puppeteer_forms.node_external_input

export const convert_txt_with_puppeteer_node_client_input =
  convert_txt_with_puppeteer_forms.node_client_input

export const convert_txt_with_puppeteer_node_local_external_input =
  convert_txt_with_puppeteer_forms.node_local_external_input

export const convert_txt_with_puppeteer_node_local_internal_input =
  convert_txt_with_puppeteer_forms.node_local_internal_input

export const convert_txt_with_puppeteer_node_local_input =
  convert_txt_with_puppeteer_forms.node_local_input

export const convert_txt_with_puppeteer_node_output =
  convert_txt_with_puppeteer_forms.node_output

export const convert_txt_with_puppeteer_browser_input =
  convert_txt_with_puppeteer_forms.browser_input

export const convert_txt_with_puppeteer_browser_remote_input =
  convert_txt_with_puppeteer_forms.browser_remote_input

export const convert_txt_with_puppeteer_browser_local_input =
  convert_txt_with_puppeteer_forms.browser_local_input

export const convert_txt_with_puppeteer_browser_output =
  convert_txt_with_puppeteer_forms.browser_output

const convert_markdown_with_puppeteer_forms =
  buildConvertFormsToStringContent(
    'convert_markdown_with_puppeteer',
    'puppeteer_markdown_input_format',
    'puppeteer_output_format',
    {
      viewport: {
        need: false,
        link: {
          width: { like: 'natural_number', need: false },
          height: { like: 'natural_number', need: false },
        },
      },
      proxy: { like: 'string', need: false },
      waitUntil: { like: 'puppeteer_life_cycle_event', need: false },
      style: {
        need: false,
        link: {
          margin,
          h1: { like: 'text_style', need: false },
          h2: { like: 'text_style', need: false },
          h3: { like: 'text_style', need: false },
          h4: { like: 'text_style', need: false },
          h5: { like: 'text_style', need: false },
          h6: { like: 'text_style', need: false },
          text: { like: 'text_style', need: false },
          link: { like: 'text_style', need: false },
        },
      },
    },
  )

export const convert_markdown_with_puppeteer_node_input =
  convert_markdown_with_puppeteer_forms.node_input

export const convert_markdown_with_puppeteer_node_remote_input =
  convert_markdown_with_puppeteer_forms.node_remote_input

export const convert_markdown_with_puppeteer_node_external_input =
  convert_markdown_with_puppeteer_forms.node_external_input

export const convert_markdown_with_puppeteer_node_client_input =
  convert_markdown_with_puppeteer_forms.node_client_input

export const convert_markdown_with_puppeteer_node_local_external_input =
  convert_markdown_with_puppeteer_forms.node_local_external_input

export const convert_markdown_with_puppeteer_node_local_internal_input =
  convert_markdown_with_puppeteer_forms.node_local_internal_input

export const convert_markdown_with_puppeteer_node_local_input =
  convert_markdown_with_puppeteer_forms.node_local_input

export const convert_markdown_with_puppeteer_node_output =
  convert_markdown_with_puppeteer_forms.node_output

export const convert_markdown_with_puppeteer_browser_input =
  convert_markdown_with_puppeteer_forms.browser_input

export const convert_markdown_with_puppeteer_browser_remote_input =
  convert_markdown_with_puppeteer_forms.browser_remote_input

export const convert_markdown_with_puppeteer_browser_local_input =
  convert_markdown_with_puppeteer_forms.browser_local_input

export const convert_markdown_with_puppeteer_browser_output =
  convert_markdown_with_puppeteer_forms.browser_output

const convert_document_with_pandoc_forms = buildConvertForms(
  'convert_document_with_pandoc',
  'pandoc_input_format',
  'pandoc_output_format',
)

export const convert_document_with_pandoc_command_input =
  convert_document_with_pandoc_forms.command_input

export const convert_document_with_pandoc_node_input =
  convert_document_with_pandoc_forms.node_input

export const convert_document_with_pandoc_node_remote_input =
  convert_document_with_pandoc_forms.node_remote_input

export const convert_document_with_pandoc_node_external_input =
  convert_document_with_pandoc_forms.node_external_input

export const convert_document_with_pandoc_node_client_input =
  convert_document_with_pandoc_forms.node_client_input

export const convert_document_with_pandoc_node_local_external_input =
  convert_document_with_pandoc_forms.node_local_external_input

export const convert_document_with_pandoc_node_local_internal_input =
  convert_document_with_pandoc_forms.node_local_internal_input

export const convert_document_with_pandoc_node_local_input =
  convert_document_with_pandoc_forms.node_local_input

export const convert_document_with_pandoc_node_output =
  convert_document_with_pandoc_forms.node_output

export const convert_document_with_pandoc_browser_input =
  convert_document_with_pandoc_forms.browser_input

export const convert_document_with_pandoc_browser_remote_input =
  convert_document_with_pandoc_forms.browser_remote_input

export const convert_document_with_pandoc_browser_local_input =
  convert_document_with_pandoc_forms.browser_local_input

export const convert_document_with_pandoc_browser_output =
  convert_document_with_pandoc_forms.browser_output

const convert_document_with_enscript_forms = buildConvertForms(
  'convert_document_with_enscript',
  'enscript_input_format',
  'enscript_output_format',
)

export const convert_document_with_enscript_command_input =
  convert_document_with_enscript_forms.command_input

export const convert_document_with_enscript_node_input =
  convert_document_with_enscript_forms.node_input

export const convert_document_with_enscript_node_remote_input =
  convert_document_with_enscript_forms.node_remote_input

export const convert_document_with_enscript_node_external_input =
  convert_document_with_enscript_forms.node_external_input

export const convert_document_with_enscript_node_client_input =
  convert_document_with_enscript_forms.node_client_input

export const convert_document_with_enscript_node_local_external_input =
  convert_document_with_enscript_forms.node_local_external_input

export const convert_document_with_enscript_node_local_internal_input =
  convert_document_with_enscript_forms.node_local_internal_input

export const convert_document_with_enscript_node_local_input =
  convert_document_with_enscript_forms.node_local_input

export const convert_document_with_enscript_node_output =
  convert_document_with_enscript_forms.node_output

export const convert_document_with_enscript_browser_input =
  convert_document_with_enscript_forms.browser_input

export const convert_document_with_enscript_browser_remote_input =
  convert_document_with_enscript_forms.browser_remote_input

export const convert_document_with_enscript_browser_local_input =
  convert_document_with_enscript_forms.browser_local_input

export const convert_document_with_enscript_browser_output =
  convert_document_with_enscript_forms.browser_output
