import PropTypes from 'prop-types'
import { Label } from './Label'

export const Text = ({ label, disabled, type, text, setText }: TextProps) => (
  <Label disabled={disabled}>
    {label && <span>{label}</span>}
    <input
      type={type}
      defaultValue={text}
      onChange={e => setText(e.target.value)}
    />
  </Label>
)

interface TextProps {
  label: string
  disabled: boolean
  type: string
  text: string
  setText: (text: string) => void
}

Text.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired
}

Text.defaultProps = {
  label: '',
  disabled: false,
  type: 'text'
}
