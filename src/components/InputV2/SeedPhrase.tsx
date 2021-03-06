import PropTypes from 'prop-types'
import { validateMnemonic } from 'bip39'
import { useEffect, useState, useMemo } from 'react'
import { BaseInput, BaseInputProps, BaseInputPropTypes } from './Base'

/**
 * SeedPhraseInput
 */
export const SeedPhraseInput = ({
  value,
  onChange,
  onFocus,
  onBlur,
  setIsValid,
  ...baseProps
}: SeedPhraseInputProps) => {
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [hasChanged, setHasChanged] = useState<boolean>(false)

  // Check for input errors
  const error = useMemo<string>(
    () => (validateMnemonic(value) ? '' : 'Invalid seed phrase'),
    [value]
  )

  // Communicate validity to parent component
  useEffect(() => setIsValid(!error), [setIsValid, error])

  const onChangeBase = (newValue: string) => {
    setHasChanged(true)
    onChange(newValue)
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
      autoComplete='off'
      placeholder='talk online harbor bulb duty athlete short follow fitness basket calm zero cabbage donkey base'
      value={value}
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
 * error: set by seed phrase input validation
 * type: always "text" for seed phrase input
 * autoComplete: always "off" for seed phrase
 * placeholder: shows example seed phrase
 *
 * We add "setIsValid"
 */

export type SeedPhraseInputProps = {
  setIsValid?: (isValid: boolean) => void
} & Omit<BaseInputProps, 'error' | 'type' | 'autoComplete' | 'placeholder'>

const { error, type, autoComplete, placeholder, ...seedPhraseProps } =
  BaseInputPropTypes

SeedPhraseInput.propTypes = {
  setIsValid: PropTypes.func,
  ...seedPhraseProps
}

/**
 * Provide defaults for props that are used in this input
 */

SeedPhraseInput.defaultProps = {
  value: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  setIsValid: () => {}
}
