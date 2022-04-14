import { shape, string, oneOfType, number, oneOf, object } from 'prop-types'
import { validateAddressString } from '@glif/filecoin-address'

const createAddressPropType = isRequired => (props, propName, componentName) => {
  const prop = props[propName]
  if (prop == null) {
    if (isRequired) {
      return new Error(`Missing prop "${propName}" in "${componentName}"`);
    }
  } else if (!validateAddressString(prop)) {
    return new Error(
      `Invalid prop "${propName}" supplied to "${componentName}"`
    )
  }
}

export const ADDRESS_PROPTYPE = createAddressPropType(false)
export const ADDRESS_PROPTYPE_REQUIRED = createAddressPropType(true)

export const GRAPHQL_ADDRESS_PROP_TYPE = shape({
  id: string,
  robust: string
})

export const FILECOIN_NUMBER_PROP = (props, propName, componentName) => {
  // instanceof prop checking is broken in nextjs on server side render cycles
  const representsANum = Number.isNaN(Number(props[propName].toString()))
  const hasFilecoinNumMethods = !!(
    props[propName].toFil &&
    props[propName].toAttoFil &&
    props[propName].toPicoFil
  )
  if (!(representsANum || hasFilecoinNumMethods))
    return new Error(
      `Invalid prop: ${propName} supplied to ${componentName}. Validation failed.`
    )

  return null
}

export const MESSAGE_PROPS = shape({
  /**
   * Message sent to this address
   */
  to: ADDRESS_PROPTYPE_REQUIRED,
  /**
   * Message sent from this address
   */
  from: ADDRESS_PROPTYPE_REQUIRED,
  /**
   * The amount of FIL sent in the message
   */
  value: string.isRequired,
  /**
   * The message's cid
   */
  cid: string.isRequired,
  /**
   * Either pending or confirmed
   */
  status: oneOf(['confirmed', 'pending']).isRequired,
  timestamp: oneOfType([string, number]).isRequired,
  method: string.isRequired,
  params: object.isRequired
})
