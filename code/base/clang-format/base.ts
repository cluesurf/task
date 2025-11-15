import STYLE_CPP from './style.cpp.type.json'
import STYLE_JAVA from './style.java.type.json'
import STYLE_JAVASCRIPT from './style.javascript.type.json'
import STYLE_OBJC from './style.objc.type.json'
import STYLE_ALL from './style.all.type.json'
import { Form } from '@cluesurf/form'

export const clang_style_all: Form = {
  form: 'form',
  save: '~/code/form/object/clang-format',
  link: STYLE_ALL,
}

export const clang_style_cpp: Form = {
  form: 'form',
  save: '~/code/form/object/clang-format',
  base: 'clang_style_all',
  link: STYLE_CPP,
}

export const clang_style_java: Form = {
  form: 'form',
  save: '~/code/form/object/clang-format',
  base: 'clang_style_all',
  link: STYLE_JAVA,
}

export const clang_style_javascript: Form = {
  form: 'form',
  save: '~/code/form/object/clang-format',
  base: 'clang_style_all',
  link: STYLE_JAVASCRIPT,
}

export const clang_style_objc: Form = {
  form: 'form',
  save: '~/code/form/object/clang-format',
  base: 'clang_style_all',
  link: STYLE_OBJC,
}
