import {
  shape,
  string,
  oneOfType,
  number,
  oneOf,
  object,
  Requireable
} from 'prop-types'
import { validateAddressString } from '@glif/filecoin-address'
import {
  LEDGER,
  METAMASK,
  CREATE_MNEMONIC,
  IMPORT_MNEMONIC,
  IMPORT_SINGLE_KEY
} from './constants'

/**
 * ADDRESS_PROPTYPE
 */

const createAddressPropType =
  isRequired => (props, propName, componentName) => {
    const prop = props[propName]
    if (prop == null) {
      if (isRequired) {
        return new Error(`Missing prop "${propName}" in "${componentName}"`)
      }
    } else if (!validateAddressString(prop)) {
      return new Error(
        `Invalid prop "${propName}" supplied to "${componentName}"`
      )
    }
  }

export const ADDRESS_PROPTYPE: Requireable<any> = Object.assign(
  createAddressPropType(false),
  { isRequired: createAddressPropType(true) }
)

/**
 * GRAPHQL_ADDRESS_PROP_TYPE
 */

export const GRAPHQL_ADDRESS_PROP_TYPE = shape({
  id: string,
  robust: string
})

/**
 * FILECOIN_NUMBER_PROPTYPE
 */

const createFilecoinNumberPropType =
  isRequired => (props, propName, componentName) => {
    const prop = props[propName]
    if (prop == null) {
      if (isRequired) {
        return new Error(`Missing prop "${propName}" in "${componentName}"`)
      }
    } else {
      // instanceof prop checking is broken in nextjs on server side render cycles
      const isFilecoinNumber =
        typeof prop === 'object' &&
        'toFil' in prop &&
        'toAttoFil' in prop &&
        'toPicoFil' in prop
      if (!isFilecoinNumber)
        return new Error(
          `Invalid prop "${propName}" supplied to "${componentName}"`
        )
    }
  }

export const FILECOIN_NUMBER_PROPTYPE: Requireable<any> = Object.assign(
  createFilecoinNumberPropType(false),
  { isRequired: createFilecoinNumberPropType(true) }
)

/**
 * MESSAGE_PROPS
 */

export const MESSAGE_PROPS = shape({
  to: ADDRESS_PROPTYPE.isRequired,
  from: ADDRESS_PROPTYPE.isRequired,
  value: string.isRequired,
  cid: string.isRequired,
  status: oneOf(['confirmed', 'pending']).isRequired,
  timestamp: oneOfType([string, number]).isRequired,
  method: string.isRequired,
  params: object.isRequired
})

/**
 * Login Option
 */

export type LoginOption =
'LEDGER' |
'METAMASK' |
'CREATE_MNEMONIC' |
'IMPORT_MNEMONIC' |
'IMPORT_SINGLE_KEY'

export const LOGIN_OPTION_PROPTYPE = oneOf([
  LEDGER,
  METAMASK,
  CREATE_MNEMONIC,
  IMPORT_MNEMONIC,
  IMPORT_SINGLE_KEY
])

/**
 * MSIG Method
 */

export enum MsigMethod {
  WITHDRAW = 0,
  CONSTRUCTOR,
  PROPOSE,
  APPROVE,
  CANCEL,
  ADD_SIGNER,
  REMOVE_SIGNER,
  SWAP_SIGNER,
  CHANGE_NUM_APPROVALS_THRESHOLD,
  LOCK_BALANCE
}
