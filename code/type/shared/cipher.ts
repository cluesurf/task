import merge from 'lodash/merge.js'
import { Cipher, CipherData } from '~/code/type/shared/index.js'

export type CipherContentValue = CipherData

export type CipherContent = Record<Cipher, CipherContentValue>
