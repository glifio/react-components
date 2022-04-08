import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Label } from './Label'

const ToggleLabel = styled(Label)`
  .wrapper {
    display: inline-block;
    position: relative;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;
  }

  .toggle {
    display: block;
    position: relative;
    width: 2.25em;
    height: 1.5em;
    border-radius: 0.75em;
    border: 2px solid var(--blue-light);
    background-color: var(--blue-light);

    ${props =>
      props.disabled &&
      css`
        border-color: var(--gray-light);
        background-color: var(--gray-light);
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

  &:hover .toggle,
  input:checked ~ .toggle {
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
  disabled,
  checked,
  setChecked
}: ToggleProps) => (
  <ToggleLabel disabled={disabled}>
    {label && <span>{label}</span>}
    <span className='wrapper'>
      <input
        type='checkbox'
        defaultChecked={checked}
        onChange={e => setChecked(e.target.checked)}
      />
      <span className='toggle'></span>
    </span>
  </ToggleLabel>
)

interface ToggleProps {
  label: string
  disabled: boolean
  checked: boolean
  setChecked: (checked: boolean) => void
}

Toggle.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired
}

Toggle.defaultProps = {
  label: '',
  disabled: false
}
