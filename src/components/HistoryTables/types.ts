import PropTypes from 'prop-types'
import { GRAPHQL_ADDRESS_PROP_TYPE } from '../../customPropTypes'
import { Message, MessagePending } from '../../generated/graphql'

export type MessageConfirmedRow = Pick<
  Message,
  'cid' | 'method' | 'height' | 'from' | 'to' | 'value'
>
export type MessagePendingRow = Pick<
  MessagePending,
  'cid' | 'method' | 'from' | 'to' | 'value'
>

export const BLOCK_PROP_TYPE = PropTypes.shape({
  Cid: PropTypes.string.isRequired,
  Height: PropTypes.number,
  Miner: PropTypes.string,
  Timestamp: PropTypes.number.isRequired
})

export const MESSAGE_CONFIRMED_ROW_PROP_TYPE = PropTypes.shape({
  cid: PropTypes.string.isRequired,
  // TODO tighten once the server is returning the same types
  method: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.number.isRequired,
  from: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  to: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  value: PropTypes.string.isRequired
})

export const MESSAGE_PENDING_ROW_PROP_TYPE = PropTypes.shape({
  cid: PropTypes.string.isRequired,
  // TODO tighten once the server is returning the same types
  method: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  block: BLOCK_PROP_TYPE.isRequired,
  from: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  to: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  value: PropTypes.string.isRequired
})

export const PROPOSAL_ROW_PROP_TYPE = PropTypes.shape({
  id: PropTypes.number.isRequired,
  method: PropTypes.number.isRequired,
  params: PropTypes.object,
  to: GRAPHQL_ADDRESS_PROP_TYPE,
  approved: PropTypes.arrayOf(GRAPHQL_ADDRESS_PROP_TYPE),
  proposalHash: PropTypes.string.isRequired
})
