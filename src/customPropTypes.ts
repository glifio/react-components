import {
  shape,
  string,
  number,
  arrayOf,
  oneOf,
  Requireable,
  any
} from 'prop-types'
import { validateMnemonic } from 'bip39'
import { CoinType } from '@glif/filecoin-address'
import { FilecoinNumber } from '@glif/filecoin-number'
import { LotusCID } from '@glif/filecoin-actor-utils'
import { CID } from 'multiformats/cid'
import BigNumber from 'bignumber.js'

import { isAddress } from './utils/isAddress'
import { Network } from './services/EnvironmentProvider'
import {
  MessageQuery,
  MessagesQuery,
  PendingMessageQuery
} from './generated/graphql'

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
    } else if (!isAddress(prop)) {
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
    } else if (!FilecoinNumber.isFilecoinNumber(prop)) {
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

export const GRAPHQL_GAS_COST_PROPTYPE = shape({
  baseFeeBurn: string.isRequired,
  minerPenalty: string.isRequired,
  minerTip: string.isRequired,
  overEstimationBurn: string.isRequired,
  refund: string.isRequired,
  totalCost: string.isRequired,
  gasUsed: number.isRequired
})

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
  params: string.isRequired
})

export const GRAPHQL_MESSAGE_RECEIPT_PROPTYPE = shape({
  exitCode: number.isRequired,
  return: string.isRequired,
  gasUsed: number.isRequired
})

export type GqlMessage = MessageQuery['message']

export const GRAPHQL_MESSAGE_PROPTYPE = shape({
  cid: string.isRequired,
  to: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  from: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  nonce: number.isRequired,
  height: number.isRequired,
  method: number.isRequired,
  params: string.isRequired,
  value: string.isRequired,
  gasPremium: string.isRequired,
  gasFeeCap: string.isRequired,
  gasLimit: number.isRequired
})

export type GqlMessagesMsg = MessagesQuery['messages'][number]

export const GRAPHQL_MESSAGES_MSG_PROPTYPE = shape({
  cid: string.isRequired,
  to: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  from: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  nonce: number.isRequired,
  height: number.isRequired,
  method: number.isRequired,
  params: string.isRequired,
  value: string.isRequired
})

export type GqlMessagePending = PendingMessageQuery['pendingMessage']

export const GRAPHQL_MESSAGE_PENDING_PROPTYPE = shape({
  cid: string.isRequired,
  to: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  from: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  nonce: number.isRequired,
  height: number.isRequired,
  method: number.isRequired,
  params: string.isRequired,
  value: string.isRequired,
  gasPremium: string,
  gasFeeCap: string,
  gasLimit: number
})

export const GRAPHQL_MSIG_TRANSACTION_PROPTYPE = shape({
  id: number.isRequired,
  to: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  method: number.isRequired,
  params: string.isRequired,
  value: string.isRequired,
  proposalHash: string.isRequired,
  approved: arrayOf(GRAPHQL_ADDRESS_PROP_TYPE)
})

export const LOTUS_MESSAGE_PROPTYPE = shape({
  CID: shape({
    '/': string.isRequired
  }).isRequired,
  From: string.isRequired,
  To: string.isRequired,
  Value: string.isRequired,
  Method: number.isRequired,
  Nonce: number.isRequired,
  Params: string,
  Version: number,
  GasFeeCap: string,
  GasPremium: string,
  GasLimit: number
})

export const MESSAGE_RECEIPT_PROPTYPE = shape({
  ExitCode: number.isRequired,
  GasUsed: number.isRequired,
  Return: string
})

export const EXECUTION_TRACE_PROPTYPE = shape({
  Duration: number.isRequired,
  Msg: LOTUS_MESSAGE_PROPTYPE.isRequired,
  MsgRct: MESSAGE_RECEIPT_PROPTYPE.isRequired,
  GasCharges: number,
  Error: string,
  Subcalls: any
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
 * MSIG State
 */

export interface MsigState {
  InitialBalance: string
  NextTxnID: number
  NumApprovalsThreshold: number
  PendingTxns: LotusCID
  Signers: string[]
  StartEpoch: number
  UnlockDuration: number
}

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
  LoadingFailed,
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

export const WALLET_PROPTYPE = shape({
  path: string,
  balance: FILECOIN_NUMBER_PROPTYPE.isRequired,
  robust: ADDRESS_PROPTYPE.isRequired,
  id: ADDRESS_PROPTYPE.isRequired,
  address: ADDRESS_PROPTYPE.isRequired
})
/* Actor types */

export type SystemActorState = {
  BuiltinActors: LotusCID
}

export type BuiltInActorName =
  | 'system'
  | 'init'
  | 'cron'
  | 'account'
  | 'storagepower'
  | 'storageminer'
  | 'storagemarket'
  | 'paymentchannel'
  | 'multisig'
  | 'reward'
  | 'verifiedregistry'
  | 'evm'

export type BuiltInActorRecord = [BuiltInActorName, CID]

export type BuiltInActorRegistryReturn = BuiltInActorRecord[]

export type BuiltInActorNetworkRegistry = Record<string, BuiltInActorName>

export type BuiltInActorRegistry = Record<Network, BuiltInActorNetworkRegistry>
