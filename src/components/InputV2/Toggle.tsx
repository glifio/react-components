import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Label } from './Label'
import { Colors } from '../theme'

const ToggleLabel = styled(Label)`
  .toggle-wrapper {
    position: relative;
  }

  input {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    opacity: 0;
  }

  .toggle {
    display: inline-block;
    position: relative;
    width: 2.25em;
    height: 1.5em;
    border-radius: 0.75em;
    border: 2px solid ${Colors.BLUE_MEDIUM};
    background-color: ${Colors.BLUE_MEDIUM};

    ${props =>
      props.disabled &&
      css`
        border-color: ${Colors.GRAY_LIGHT} !important;
        background-color: ${Colors.GRAY_LIGHT} !important;
      `}

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: calc(1.5em - 4px);
      height: calc(1.5em - 4px);
      border-radius: 50%;
      background-color: ${Colors.WHITE};
    }
  }

  input:checked ~ .toggle {
    border-color: ${Colors.BLUE_DARK};
    background-color: ${Colors.BLUE_DARK};
  }

  input:checked ~ .toggle::after {
    left: auto;
    right: 0;
  }
`

export const Toggle = ({
  label,
  info,
  autoFocus,
  disabled,
  checked,
  onChange
}: ToggleProps) => (
  <ToggleLabel disabled={disabled}>
    <div>
      {label && <span>{label}</span>}
      {info && <span className='info'>{info}</span>}
    </div>
    <div className='toggle-wrapper'>
      <input
        type='checkbox'
        autoFocus={autoFocus}
        disabled={disabled}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span className='toggle'></span>
    </div>
  </ToggleLabel>
)

interface ToggleProps {
  label?: string
  info?: string
  autoFocus?: boolean
  disabled?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
}

Toggle.propTypes = {
  label: PropTypes.string,
  info: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

Toggle.defaultProps = {
  label: '',
  info: '',
  autoFocus: false,
  disabled: false,
  checked: false,
  onChange: () => {}
}
