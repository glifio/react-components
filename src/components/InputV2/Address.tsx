import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  delegatedFromEthAddress,
  ethAddressFromDelegated
} from '@glif/filecoin-address'
import { useEffect, useState, useMemo, ReactNode } from 'react'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'
import { AddressLink } from '../LabeledText/AddressLink'
import { truncateString } from '../../utils/truncateString'
import {
  isAddress,
  isDelegatedAddress,
  isEthAddress
} from '../../utils/isAddress'

const Suffix = styled.div`
  font-size: 0.875rem;
`

/**
 * AddressInput
 */
export const AddressInput = ({
  value,
  onChange,
  onFocus,
  onBlur,
  setIsValid,
  setDelegated,
  truncate,
  actor,
  ...baseProps
}: AddressInputProps) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [hasChanged, setHasChanged] = useState<boolean>(false)

  // Check for input errors
  const error = useMemo<string>(() => {
    if (!isAddress(value)) return 'Needs to be a valid address'
    if (actor && value[1] !== '0' && value[1] !== '2')
      return 'Second character must be 0 or 2'
    return ''
  }, [value, actor])

  // Truncate address if valid
  const truncated = useMemo<string>(
    () => (error ? value : truncateString(value)),
    [error, value]
  )

  // Convert to delegated if eth
  const delegatedFromEth = useMemo<string | null>(
    () =>
      !error && isEthAddress(value) ? delegatedFromEthAddress(value) : null,
    [error, value]
  )

  // Convert to eth if delegated
  const ethFromDelegated = useMemo<string | null>(
    () =>
      !error && isDelegatedAddress(value)
        ? ethAddressFromDelegated(value)
        : null,
    [error, value]
  )

  // Communicate delegated address to parent component
  useEffect(
    () => setDelegated(delegatedFromEth),
    [setDelegated, delegatedFromEth]
  )

  // Determine suffix
  const suffix = useMemo<ReactNode>(
    () =>
      delegatedFromEth || ethFromDelegated ? (
        <Suffix>
          Converts into{' '}
          <AddressLink
            inline
            address={delegatedFromEth || ethFromDelegated}
            fetchAddress={false}
          />
        </Suffix>
      ) : null,
    [delegatedFromEth, ethFromDelegated]
  )

  // Communicate validity to parent component
  useEffect(() => setIsValid(!error), [setIsValid, error])

  const onChangeBase = (newValue: string) => {
    setHasChanged(true)
    onChange(newValue.trim())
  }

  const onFocusBase = () => {
    setHasFocus(true)
    onFocus()
  }

  const onBlurBase = () => {
    setHasFocus(false)
    onBlur()
  }

  return (
    <BaseInput
      error={!hasFocus && hasChanged ? error : ''}
      type='text'
      placeholder={actor ? 'f2...' : 'f1...'}
      value={hasFocus || !truncate ? value : truncated}
      suffix={suffix}
      onChange={onChangeBase}
      onFocus={onFocusBase}
      onBlur={onBlurBase}
      {...baseProps}
    />
  )
}

/**
 * We strip certain properties from the standard
 * base input props because we want to override them:
 *
 * error: set by address input validation
 * type: always "text" for address input
 * placeholder: always "f1..." for address input
 * suffix: displays converted address if eth or delegated
 *
 * We add "setIsValid", "setDelegated", "truncate" and "actor"
 */

export type AddressInputProps = {
  setIsValid?: (isValid: boolean) => void
  setDelegated?: (delegated: string | null) => void
  truncate?: boolean
  actor?: boolean
} & Omit<BaseInputProps, 'error' | 'type' | 'placeholder' | 'suffix'>

const { error, type, placeholder, suffix, ...addressProps } = BaseInputPropTypes

AddressInput.propTypes = {
  setIsValid: PropTypes.func,
  setDelegated: PropTypes.func,
  truncate: PropTypes.bool,
  actor: PropTypes.bool,
  ...addressProps
}

/**
 * Provide defaults for props that are used in this input
 */

AddressInput.defaultProps = {
  value: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  setIsValid: () => {},
  setDelegated: () => {},
  truncate: true,
  actor: false
}
