import PropTypes from 'prop-types'
import { Label } from './Label'

export const Select = ({
  vertical,
  centered,
  label,
  info,
  error,
  autoFocus,
  disabled,
  placeholder,
  options,
  value,
  onChange,
  onFocus,
  onBlur,
  onEnter
}: SelectProps) => {
  return (
    <Label
      disabled={disabled}
      vertical={vertical}
      centered={centered}
      error={!!error}
    >
      {vertical ? (
        <>
          {label && <span>{label}</span>}
          {info && <span className='info'>{info}</span>}
        </>
      ) : (
        <div>
          {label && <span>{label}</span>}
          {info && <span className='info'>{info}</span>}
          {error && <span className='error'>{error}</span>}
        </div>
      )}
      <div className='select-wrapper'>
        <select
          className={error ? 'error' : ''}
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
              {option}
            </option>
          ))}
        </select>
        <div className='select-arrow' />
      </div>
      {vertical && error && <span className='error'>{error}</span>}
    </Label>
  )
}

export interface SelectProps {
  vertical?: boolean
  centered?: boolean
  label?: string
  info?: string
  error?: string
  autoFocus?: boolean
  disabled?: boolean
  placeholder?: string
  options?: Array<string>
  value?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onEnter?: () => void
}

Select.propTypes = {
  vertical: PropTypes.bool,
  centered: PropTypes.bool,
  label: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onEnter: PropTypes.func
}

Select.defaultProps = {
  vertical: false,
  centered: false,
  label: '',
  info: '',
  error: '',
  autoFocus: false,
  disabled: false,
  placeholder: '',
  options: [],
  value: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onEnter: () => {}
}
