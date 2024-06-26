import merge from 'lodash/merge'
import { Cipher, CipherData } from '~/code/type/shared/index'

export type CipherContentValue = CipherData

export type CipherContent = Record<Cipher, CipherContentValue>
