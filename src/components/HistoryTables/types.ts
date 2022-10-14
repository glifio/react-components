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

export const MESSAGE_CONFIRMED_ROW_PROP_TYPE = PropTypes.shape({
  cid: PropTypes.string.isRequired,
  method: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  from: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  to: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  value: PropTypes.string.isRequired
})

export const MESSAGE_PENDING_ROW_PROP_TYPE = PropTypes.shape({
  cid: PropTypes.string.isRequired,
  method: PropTypes.number.isRequired,
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
