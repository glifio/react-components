import PropTypes from 'prop-types'
import { Label } from './Label'

export const Text = ({ label, disabled, controlled, type, text, setText }: TextProps) => (
  <Label disabled={disabled}>
    {label && <span>{label}</span>}
    <input
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
  type: string
  text: string
  setText: (text: string) => void
}

Text.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  controlled: PropTypes.bool,
  type: PropTypes.string,
  text: PropTypes.string,
  setText: PropTypes.func
}

Text.defaultProps = {
  label: '',
  disabled: false,
  controlled: true,
  type: 'text',
  text: '',
  setText: () => {}
}
