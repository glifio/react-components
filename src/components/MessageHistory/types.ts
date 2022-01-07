import PropTypes from 'prop-types'
import { MessageConfirmed } from '../../generated/graphql'

export type MessageConfirmedRow = Pick<
  MessageConfirmed,
  | 'cid'
  | 'methodName'
  | 'height'
  | 'block'
  | 'from'
  | 'to'
  | 'value'
  | 'baseFeeBurn'
  | 'overEstimationBurn'
  | 'minerTip'
>

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

export const MESSAGE_CONFIRMED_ROW_PROP_TYPE = PropTypes.shape({
  cid: PropTypes.string.isRequired,
  methodName: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  block: BLOCK_PROP_TYPE.isRequired,
  from: ADDRESS_PROP_TYPE.isRequired,
  to: ADDRESS_PROP_TYPE.isRequired,
  value: PropTypes.string.isRequired,
  baseFeeBurn: PropTypes.string.isRequired,
  overEstimationBurn: PropTypes.string.isRequired,
  minerTip: PropTypes.string.isRequired
})
