import PropTypes from 'prop-types'
import { Label } from './Label'

export const TextInput = ({
  vertical,
  centered,
  label,
  info,
  error,
  type,
  autofocus,
  disabled,
  placeholder,
  controlled,
  value,
  onChange,
  onBlur
}: TextInputProps) => (
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
        {error && <span className='error'>{error}</span>}
      </div>
    )}
    <input
      className={error ? 'error' : ''}
      type={type}
      autoFocus={autofocus}
      disabled={disabled}
      placeholder={placeholder}
      value={controlled ? value : undefined}
      defaultValue={controlled ? undefined : value}
      onChange={e => onChange(e.target.value)}
      onBlur={e => onBlur(e.target.value)}
    />
    {vertical && error && <span className='error'>{error}</span>}
  </Label>
)

export interface TextInputProps {
  vertical: boolean
  centered: boolean
  label: string
  info: string
  error: string
  type: string
  autofocus: boolean
  disabled: boolean
  placeholder: string
  controlled: boolean
  value: string
  onChange: (value: string) => void
  onBlur: (value: string) => void
}

TextInput.propTypes = {
  vertical: PropTypes.bool,
  centered: PropTypes.bool,
  label: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  controlled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
}

TextInput.defaultProps = {
  vertical: false,
  centered: false,
  label: '',
  info: '',
  error: '',
  type: 'text',
  autofocus: false,
  disabled: false,
  placeholder: '',
  controlled: true,
  value: '',
  onChange: () => {},
  onBlur: () => {}
}
