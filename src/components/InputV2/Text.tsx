import PropTypes from 'prop-types'
import { Label } from './Label'

export const Text = ({
  label,
  disabled,
  controlled,
  placeholder,
  type,
  value,
  onChange
}: TextProps) => (
  <Label disabled={disabled}>
    {label && <span>{label}</span>}
    <input
      placeholder={placeholder}
      disabled={disabled}
      type={type}
      value={controlled ? value : undefined}
      defaultValue={controlled ? undefined : value}
      onChange={e => onChange(e.target.value)}
    />
  </Label>
)

interface TextProps {
  label: string
  disabled: boolean
  controlled: boolean
  placeholder: string
  type: string
  value: string
  onChange: (value: string) => void
}

Text.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  controlled: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

Text.defaultProps = {
  label: '',
  disabled: false,
  controlled: true,
  placeholder: '',
  type: 'text',
  value: '',
  onChange: () => {}
}
