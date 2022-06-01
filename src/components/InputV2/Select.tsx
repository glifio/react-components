import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Label } from './Label'
import truncateAddress from '../../utils/truncateAddress'

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
  // Unless there is a placeholder option, ensure value
  // is set to the first supplied option when it's empty
  useEffect(
    () => !placeholder && !value && options[0] && onChange(options[0]),
    [value, placeholder, options, onChange]
  )

  // Communicate validity to parent component
  useEffect(
    () => setIsValid(!required || !!value),
    [value, required, setIsValid]
  )

  return (
    <Label disabled={disabled} vertical={vertical} centered={centered}>
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
            <option value='' disabled selected hidden>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option} value={option}>
              {address && option === value ? truncateAddress(option) : option}
            </option>
          ))}
        </select>
        <div className='select-arrow' />
      </div>
    </Label>
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

Select.propTypes = {
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
