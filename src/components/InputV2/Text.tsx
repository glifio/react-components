import PropTypes from 'prop-types'
import { Label } from './Label'

export const Text = ({
  label,
  error,
  type,
  autofocus,
  disabled,
  placeholder,
  controlled,
  value,
  onChange
}: TextProps) => (
  <Label disabled={disabled}>
    <div>
      {label && <span>{label}</span>}
      {error && <span className='error'>{error}</span>}
    </div>
    <input
      className={error ? 'error' : ''}
      type={type}
      autoFocus={autofocus}
      disabled={disabled}
      placeholder={placeholder}
      value={controlled ? value : undefined}
      defaultValue={controlled ? undefined : value}
      onChange={e => onChange(e.target.value)}
    />
  </Label>
)

interface TextProps {
  label: string
  error: string
  type: string
  autofocus: boolean
  disabled: boolean
  placeholder: string
  controlled: boolean
  value: string
  onChange: (value: string) => void
}

Text.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  controlled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func
}

Text.defaultProps = {
  label: '',
  error: '',
  type: 'text',
  autofocus: false,
  disabled: false,
  placeholder: '',
  controlled: true,
  value: '',
  onChange: () => {}
}
