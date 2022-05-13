import PropTypes from 'prop-types'
import { Label } from './Label'

export const BaseInput = ({
  vertical,
  centered,
  label,
  info,
  error,
  name,
  type,
  autofocus,
  disabled,
  placeholder,
  value,
  unit,
  onChange,
  onFocus,
  onBlur,
  onEnter
}: BaseInputProps) => (
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
    <div className='text-input-wrapper'>
      <input
        className={error ? 'error' : ''}
        name={name}
        type={type}
        autoFocus={autofocus}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        onKeyDown={e => e.key === 'Enter' && onEnter()}
        style={{ paddingRight: `${1 + 0.75 * unit.length}em` }}
      />
      {unit && <span className='unit'>{unit}</span>}
    </div>
    {vertical && error && <span className='error'>{error}</span>}
  </Label>
)

export interface BaseInputProps {
  vertical?: boolean
  centered?: boolean
  label?: string
  info?: string
  error?: string
  name?: string
  type?: string
  autofocus?: boolean
  disabled?: boolean
  placeholder?: string
  value?: string
  unit?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onEnter?: () => void
}

export const BaseInputPropTypes = {
  vertical: PropTypes.bool,
  centered: PropTypes.bool,
  label: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  unit: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onEnter: PropTypes.func
}

BaseInput.propTypes = BaseInputPropTypes
BaseInput.defaultProps = {
  vertical: false,
  centered: false,
  label: '',
  info: '',
  error: '',
  name: '',
  type: 'text',
  autofocus: false,
  disabled: false,
  placeholder: '',
  value: '',
  unit: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onEnter: () => {}
}
