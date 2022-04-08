import PropTypes from 'prop-types'
import { Label } from './Label'

export const Text = ({
  label,
  disabled,
  controlled,
  placeholder,
  type,
  text,
  setText
}: TextProps) => (
  <Label disabled={disabled}>
    {label && <span>{label}</span>}
    <input
      placeholder={placeholder}
      disabled={disabled}
      type={type}
      value={controlled ? text : undefined}
      defaultValue={controlled ? undefined : text}
      onChange={e => setText(e.target.value)}
    />
  </Label>
)

interface TextProps {
  label: string
  disabled: boolean
  controlled: boolean
  placeholder: string
  type: string
  text: string
  setText: (text: string) => void
}

Text.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  controlled: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  setText: PropTypes.func
}

Text.defaultProps = {
  label: '',
  disabled: false,
  controlled: true,
  placeholder: '',
  type: 'text',
  text: '',
  setText: () => {}
}
