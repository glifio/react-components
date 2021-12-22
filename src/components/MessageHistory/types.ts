import PropTypes from 'prop-types'

export type MessageStatus = 'PENDING' | 'CONFIRMED'
export type MessageExit = 'SUCCESS' | 'ERROR'
export type MessageConf = 'LOW' | 'MEDIUM' | 'HIGH'

export type Actor = {
  id: string
  address: string
}

export interface MessageBase {
  cid: string
  method: string
  height: string
  timestamp: string
  from: Actor
  to: Actor
  value: string
  gasPremium: string
  gasLimit: string
  gasFeeCap: string
  status: MessageStatus
  confidence?: MessageConf
  gas_burned?: string
  gas_refund?: string
  base_fee_burn?: string
  gas_used?: string
  over_estimation_burn?: string
  exit?: MessageExit
  exitErr?: string
  totalCost?: string
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
  status: PropTypes.oneOf(['CONFIRMED', 'PENDING']).isRequired,
  params: PropTypes.object,
  totalCost: PropTypes.string,
  gas_burned: PropTypes.string,
  gas_refund: PropTypes.string,
  base_fee_burn: PropTypes.string,
  gas_used: PropTypes.string,
  over_estimation_burn: PropTypes.string,
  exit: PropTypes.oneOf(['SUCCESS', 'ERROR']),
  exitErr: PropTypes.string
}
