import PropTypes from 'prop-types'

export interface Address {
  id: string
  robust: string
}

export interface Block {
  Cid: string
  Height: number
  Miner: string
  Timestamp: number
}

export interface MessageConfirmed {
  cid: string
  methodName: string
  height: number
  from: Address
  to: Address
  value: string
  nonce: number
  gasPremium: string
  gasFeeCap: string
  gasLimit: number
  refund: string
  minerTip: string
  minerPenalty: string
  gasBurned: number
  gasRefund: number
  baseFeeBurn: string
  parentBaseFee: string
  gasUsed: number
  overEstimationBurn: string
  exitCode: number
  actorName: string
  actorFamily: string
  block: Block
  params?: Record<string, string>
}

export const ADDRESS_PROP_TYPE = PropTypes.shape({
  id: PropTypes.string,
  robust: PropTypes.string
})

export const BLOCK_PROP_TYPE = PropTypes.shape({
  Cid: PropTypes.string,
  Height: PropTypes.number,
  Miner: PropTypes.string,
  Timestamp: PropTypes.number.isRequired
})

export const MESSAGE_CONFIRMED_ROW_PROP_TYPES = {
  methodName: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  from: ADDRESS_PROP_TYPE.isRequired,
  to: ADDRESS_PROP_TYPE.isRequired,
  value: PropTypes.string.isRequired,
  inspectingAddress: PropTypes.string,
  minerTip: PropTypes.string.isRequired,
  baseFeeBurn: PropTypes.string.isRequired,
  parentBaseFee: PropTypes.string,
  overEstimationBurn: PropTypes.string.isRequired,
  block: BLOCK_PROP_TYPE
}

export const MESSAGE_CONFIRMED_DETAIL_PROP_TYPES = {
  method: PropTypes.number.isRequired,
  methodName: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  from: ADDRESS_PROP_TYPE.isRequired,
  to: ADDRESS_PROP_TYPE.isRequired,
  value: PropTypes.string.isRequired,
  nonce: PropTypes.number.isRequired,
  gasPremium: PropTypes.string.isRequired,
  gasFeeCap: PropTypes.string.isRequired,
  gasLimit: PropTypes.number.isRequired,
  refund: PropTypes.string.isRequired,
  minerTip: PropTypes.string.isRequired,
  minerPenalty: PropTypes.string.isRequired,
  gasBurned: PropTypes.number.isRequired,
  gasRefund: PropTypes.number.isRequired,
  baseFeeBurn: PropTypes.string.isRequired,
  parentBaseFee: PropTypes.string.isRequired,
  gasUsed: PropTypes.number.isRequired,
  overEstimationBurn: PropTypes.string.isRequired,
  exitCode: PropTypes.number.isRequired,
  actorName: PropTypes.string.isRequired,
  actorFamily: PropTypes.string.isRequired,
  block: BLOCK_PROP_TYPE.isRequired,
  params: PropTypes.objectOf(PropTypes.string)
}
