import PropTypes from 'prop-types'
import { GRAPHQL_ADDRESS_PROP_TYPE } from '../../customPropTypes'
import { Block, MessageConfirmed } from '../../generated/graphql'

export type MessageConfirmedRow = Pick<
  MessageConfirmed,
  | 'cid'
  | 'methodName'
  | 'height'
  | 'from'
  | 'to'
  | 'value'
  | 'baseFeeBurn'
  | 'overEstimationBurn'
  | 'minerTip'
> & {
  block: Pick<Block, 'Cid' | 'Timestamp'>
}

export const BLOCK_PROP_TYPE = PropTypes.shape({
  Cid: PropTypes.string.isRequired,
  Height: PropTypes.number,
  Miner: PropTypes.string,
  Timestamp: PropTypes.number.isRequired
})

export const MESSAGE_CONFIRMED_ROW_PROP_TYPE = PropTypes.shape({
  cid: PropTypes.string.isRequired,
  methodName: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  block: BLOCK_PROP_TYPE.isRequired,
  from: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  to: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  value: PropTypes.string.isRequired,
  baseFeeBurn: PropTypes.string.isRequired,
  overEstimationBurn: PropTypes.string.isRequired,
  minerTip: PropTypes.string.isRequired
})

export const PROPOSAL_ROW_PROP_TYPE = PropTypes.shape({
  id: PropTypes.number.isRequired,
  method: PropTypes.number.isRequired,
  params: PropTypes.object,
  to: PropTypes.string.isRequired,
  approved: PropTypes.arrayOf(PropTypes.string)
})
