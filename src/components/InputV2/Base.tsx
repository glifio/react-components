import PropTypes from 'prop-types'
import { Label } from './Label'
import { IconClose } from '../Icons'

export const BaseInput = ({
  deletable,
  vertical,
  centered,
  className,
  label,
  info,
  error,
  name,
  type,
  autofocus,
  disabled,
  placeholder,
  min,
  max,
  step,
  value,
  unit,
  onChange,
  onFocus,
  onBlur,
  onClick,
  onEnter,
  onDelete
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
    <div className='button-wrapper'>
      <div className='unit-wrapper'>
        <input
          className={error ? className.concat(' error') : className}
          name={name}
          type={type}
          autoFocus={autofocus}
          disabled={disabled}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
          onClick={() => onClick()}
          onKeyDown={e => e.key === 'Enter' && onEnter()}
          style={{ paddingRight: `${1 + 0.75 * unit.length}em` }}
        />
        {unit && <span className='unit'>{unit}</span>}
      </div>
      {deletable && <IconClose onClick={onDelete} />}
    </div>
    {vertical && error && <span className='error'>{error}</span>}
  </Label>
)

export interface BaseInputProps {
  deletable?: boolean
  vertical?: boolean
  centered?: boolean
  className?: string
  label?: string
  info?: string
  error?: string
  name?: string
  type?: string
  autofocus?: boolean
  disabled?: boolean
  placeholder?: string
  min?: number | string
  max?: number | string
  step?: number | string
  value?: string
  unit?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onClick?: () => void
  onEnter?: () => void
  onDelete?: () => void
}

export const BaseInputPropTypes = {
  deletable: PropTypes.bool,
  vertical: PropTypes.bool,
  centered: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.string,
  unit: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onEnter: PropTypes.func,
  onDelete: PropTypes.func
}

BaseInput.propTypes = BaseInputPropTypes
BaseInput.defaultProps = {
  deletable: false,
  vertical: false,
  centered: false,
  className: '',
  label: '',
  info: '',
  error: '',
  name: '',
  type: 'text',
  autofocus: false,
  disabled: false,
  placeholder: '',
  min: '',
  max: '',
  step: '',
  value: '',
  unit: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onClick: () => {},
  onEnter: () => {},
  onDelete: () => {}
}
