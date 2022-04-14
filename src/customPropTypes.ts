import { shape, string, oneOfType, number, oneOf, object, Requireable } from 'prop-types'
import { validateAddressString } from '@glif/filecoin-address'

interface CustomPropType {
  (a: number, b: string): string[];
  foo: string;
}

const createAddressPropType =
  isRequired => (props, propName, componentName) => {
    const prop = props[propName]
    if (prop == null) {
      if (isRequired) {
        return new Error(`Missing prop "${propName}" in "${componentName}"`)
      }
    } else if (!validateAddressString(prop)) {
      return new Error(
        `Invalid prop "${propName}" supplied to "${componentName}"`
      )
    }
  }

export const ADDRESS_PROPTYPE: Requireable<any> = Object.assign(
  createAddressPropType(false),
  { isRequired: createAddressPropType(true) }
)

export const GRAPHQL_ADDRESS_PROP_TYPE = shape({
  id: string,
  robust: string
})

const createFilecoinNumberPropType =
  isRequired => (props, propName, componentName) => {
    const prop = props[propName]
    if (prop == null) {
      if (isRequired) {
        return new Error(`Missing prop "${propName}" in "${componentName}"`)
      }
    } else {
      // instanceof prop checking is broken in nextjs on server side render cycles
      const isFilecoinNumber =
        typeof prop === 'object' &&
        'toFil' in prop &&
        'toAttoFil' in prop &&
        'toPicoFil' in prop
      if (!isFilecoinNumber)
        return new Error(
          `Invalid prop "${propName}" supplied to "${componentName}"`
        )
    }
  }

export const FILECOIN_NUMBER_PROPTYPE: Requireable<any> = Object.assign(
  createFilecoinNumberPropType(false),
  { isRequired: createFilecoinNumberPropType(true) }
)

export const MESSAGE_PROPS = shape({
  /**
   * Message sent to this address
   */
  to: ADDRESS_PROPTYPE.isRequired,
  /**
   * Message sent from this address
   */
  from: ADDRESS_PROPTYPE.isRequired,
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
