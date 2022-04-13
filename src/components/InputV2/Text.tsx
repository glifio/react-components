import PropTypes from 'prop-types'
import { Label } from './Label'

export const Text = ({
  label,
  type,
  disabled,
  placeholder,
  controlled,
  value,
  onChange
}: TextProps) => (
  <Label disabled={disabled}>
    {label && <span>{label}</span>}
    <input
      type={type}
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
  type: string
  disabled: boolean
  placeholder: string
  controlled: boolean
  value: string
  onChange: (value: string) => void
}

Text.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  controlled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func
}

Text.defaultProps = {
  label: '',
  type: 'text',
  disabled: false,
  placeholder: '',
  controlled: true,
  value: '',
  onChange: () => {}
}
