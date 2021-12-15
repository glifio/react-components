import PropTypes from 'prop-types'

export type MessageStatus = 'PENDING' | 'SUCCESS' | 'ERROR'

export type MessageBase = {
  cid: string
  method: string
  height: string
  timestamp: string
  from: string
  to: string
  value: string
  gasPremium: string
  gasLimit: string
  gasFeeCap: string
  status: MessageStatus
  feePaid?: string
  params?: Record<string, string>
}

export const messagePropTypes = {
  cid: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  gasPremium: PropTypes.string.isRequired,
  gasLimit: PropTypes.string.isRequired,
  gasFeeCap: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['SUCCESS', 'ERROR', 'PENDING']).isRequired,
  params: PropTypes.object,
  feePaid: PropTypes.string
}
