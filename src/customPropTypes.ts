import {
  shape,
  string,
  oneOfType,
  number,
  oneOf,
  arrayOf,
  Requireable
} from 'prop-types'
import { validateMnemonic } from 'bip39'
import { validateAddressString, CoinType } from '@glif/filecoin-address'
import { FilecoinNumber } from '@glif/filecoin-number'
import BigNumber from 'bignumber.js'

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
 * BigNumber
 */

const createBigNumberPropType =
  isRequired => (props, propName, componentName) => {
    const prop = props[propName]
    if (prop == null) {
      if (isRequired) {
        return new Error(`Missing prop "${propName}" in "${componentName}"`)
      }
    } else if (!BigNumber.isBigNumber(prop)) {
      return new Error(
        `Invalid prop "${propName}" supplied to "${componentName}"`
      )
    }
  }

export const BIGNUMBER_PROPTYPE: Requireable<any> = Object.assign(
  createBigNumberPropType(false),
  { isRequired: createBigNumberPropType(true) }
)

/**
 * FilecoinNumber
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
        BigNumber.isBigNumber(prop) &&
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
 * Message
 */

export const MESSAGE_PROPTYPE = shape({
  to: ADDRESS_PROPTYPE.isRequired,
  from: ADDRESS_PROPTYPE.isRequired,
  nonce: number.isRequired,
  method: number.isRequired,
  value: BIGNUMBER_PROPTYPE.isRequired,
  gasPremium: BIGNUMBER_PROPTYPE.isRequired,
  gasFeeCap: BIGNUMBER_PROPTYPE.isRequired,
  gasLimit: number.isRequired,
  params: oneOfType([string, arrayOf(string)])
})

/**
 * Gas Params
 */

export interface GasParams {
  gasFeeCap: FilecoinNumber
  gasPremium: FilecoinNumber
  gasLimit: FilecoinNumber
}

export const GAS_PARAMS_PROPTYPE = shape({
  gasFeeCap: FILECOIN_NUMBER_PROPTYPE.isRequired,
  gasPremium: FILECOIN_NUMBER_PROPTYPE.isRequired,
  gasLimit: FILECOIN_NUMBER_PROPTYPE.isRequired
})

/**
 * Login Option
 */

export enum LoginOption {
  LEDGER = 'LEDGER',
  METAMASK = 'METAMASK',
  CREATE_MNEMONIC = 'CREATE_MNEMONIC',
  IMPORT_MNEMONIC = 'IMPORT_MNEMONIC',
  IMPORT_SINGLE_KEY = 'IMPORT_SINGLE_KEY'
}

export const LOGIN_OPTION_PROPTYPE = oneOf(
  Object.values(LoginOption) as Array<LoginOption>
)

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

export const MSIG_METHOD_PROPTYPE = oneOf(
  Object.values(MsigMethod) as Array<MsigMethod>
)

/**
 * Transaction State
 * These values are numeric and should stay in order of the tx flow.
 * This is so we can check e.g. txState > TxState.FillingTxForm.
 */

export enum TxState {
  LoadingMessage = 0,
  FillingForm,
  FillingTxFee,
  LoadingTxFee,
  LoadingTxDetails,
  AwaitingConfirmation,
  MPoolPushing
}

export const TX_STATE_PROPTYPE = oneOf(Object.values(TxState) as Array<TxState>)

/**
 * CoinType
 */

export const COIN_TYPE_PROPTYPE = oneOf([CoinType.MAIN, CoinType.TEST])

/**
 * Mnemonic proptype
 */

const createMnemonicPropType =
  isRequired => (props, propName, componentName) => {
    const prop = props[propName]
    if (prop == null) {
      if (isRequired) {
        return new Error(`Missing prop "${propName}" in "${componentName}"`)
      }
    } else {
      const mnemonic = props[propName] as string
      if (!validateMnemonic(mnemonic))
        return new Error(
          `Invalid prop: ${propName} supplied to ${componentName}. Validation failed.`
        )

      return null
    }
  }

export const MNEMONIC_PROPTYPE: Requireable<any> = Object.assign(
  createMnemonicPropType(false),
  { isRequired: createMnemonicPropType(true) }
)
