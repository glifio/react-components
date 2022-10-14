import PropTypes from 'prop-types'
import { GRAPHQL_ADDRESS_PROP_TYPE } from '../../customPropTypes'
import { Message } from '../../generated/graphql'

export type MessageConfirmedRow = Pick<
  Message,
  'cid' | 'method' | 'height' | 'from' | 'to' | 'value'
>

export const MESSAGE_CONFIRMED_ROW_PROP_TYPE = PropTypes.shape({
  cid: PropTypes.string.isRequired,
  method: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  from: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  to: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  value: PropTypes.string.isRequired
})
