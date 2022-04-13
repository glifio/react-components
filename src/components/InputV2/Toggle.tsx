import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Label } from './Label'

const ToggleLabel = styled(Label)`
  .toggle-wrapper {
    position: relative;
    padding: 0.5em 0;
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
    border: 2px solid var(--blue-light);
    background-color: var(--blue-light);

    ${props =>
      props.disabled &&
      css`
        border-color: var(--gray-light) !important;
        background-color: var(--gray-light) !important;
      `}

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: calc(1.5em - 4px);
      height: calc(1.5em - 4px);
      border-radius: 50%;
      background-color: var(--white);
    }
  }

  input:hover ~ .toggle,
  input:checked ~ .toggle,
  input:focus ~ .toggle {
    border-color: var(--blue-medium);
    background-color: var(--blue-medium);
  }

  input:checked ~ .toggle::after {
    left: auto;
    right: 0;
  }
`

export const Toggle = ({
  label,
  autofocus,
  disabled,
  controlled,
  checked,
  onChange
}: ToggleProps) => (
  <ToggleLabel disabled={disabled}>
    <span>{label}</span>
    <span className='toggle-wrapper'>
      <input
        type='checkbox'
        autoFocus={autofocus}
        disabled={disabled}
        checked={controlled ? checked : undefined}
        defaultChecked={controlled ? undefined : checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span className='toggle'></span>
    </span>
  </ToggleLabel>
)

interface ToggleProps {
  label: string
  autofocus: boolean
  disabled: boolean
  controlled: boolean
  checked: boolean
  onChange: (checked: boolean) => void
}

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  controlled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

Toggle.defaultProps = {
  autofocus: false,
  disabled: false,
  controlled: true,
  checked: false,
  onChange: () => {}
}
