import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Label } from './Label'
import truncateAddress from '../../utils/truncateAddress'

const SelectLabel = styled(Label)`
  .select-wrapper {
    position: relative;

    select {
      width: 100%;
      appearance: none;
    }

    .select-arrow {
      position: absolute;
      pointer-events: none;
      top: 50%;
      right: 1.2em;
      width: 0.6em;
      height: 0.6em;
      border-right: 1.5px solid var(--black);
      border-bottom: 1.5px solid var(--black);
      transform: translateY(-0.35em) rotate(45deg);

      ${props =>
        props.disabled &&
        css`
          border-color: var(--gray-dark);
        `}
    }
  }
`

export const Select = ({
  vertical,
  centered,
  label,
  info,
  autoFocus,
  disabled,
  address,
  required,
  placeholder,
  options,
  value,
  onChange,
  onFocus,
  onBlur,
  onEnter,
  setIsValid
}: SelectProps) => {
  // Automatically select the first option if value
  // is not set and there is no placeholder text
  useEffect(
    () => !value && !placeholder && options[0] && onChange(options[0]),
    [value, placeholder, options, onChange]
  )

  // Communicate validity to parent component
  useEffect(
    () => setIsValid(value ? options.includes(value) : !required),
    [value, options, required, setIsValid]
  )

  return (
    <SelectLabel disabled={disabled} vertical={vertical} centered={centered}>
      {vertical ? (
        <>
          {label && <span>{label}</span>}
          {info && <span className='info'>{info}</span>}
        </>
      ) : (
        <div>
          {label && <span>{label}</span>}
          {info && <span className='info'>{info}</span>}
        </div>
      )}
      <div className='select-wrapper'>
        <select
          autoFocus={autoFocus}
          disabled={disabled}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={e => e.key === 'Enter' && onEnter()}
        >
          {placeholder && (
            <option value='' disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option} value={option}>
              {address ? truncateAddress(option) : option}
            </option>
          ))}
        </select>
        <div className='select-arrow' />
      </div>
    </SelectLabel>
  )
}

export interface SelectProps {
  vertical?: boolean
  centered?: boolean
  label?: string
  info?: string
  autoFocus?: boolean
  disabled?: boolean
  address?: boolean
  required?: boolean
  placeholder?: string
  options?: Array<string>
  value?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onEnter?: () => void
  setIsValid?: (isValid: boolean) => void
}

export const SelectPropTypes = {
  vertical: PropTypes.bool,
  centered: PropTypes.bool,
  label: PropTypes.string,
  info: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  address: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onEnter: PropTypes.func,
  setIsValid: PropTypes.func
}

Select.propTypes = SelectPropTypes
Select.defaultProps = {
  vertical: false,
  centered: false,
  label: '',
  info: '',
  autoFocus: false,
  disabled: false,
  address: false,
  required: true,
  placeholder: '',
  options: [],
  value: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onEnter: () => {},
  setIsValid: () => {}
}
