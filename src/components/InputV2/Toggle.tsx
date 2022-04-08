import styled from 'styled-components'
import PropTypes from 'prop-types'
import { space } from '../theme'

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${space()};
  cursor: pointer;

  &.disabled {
    pointer-events: none;

    .toggle {
      border-color: var(--gray-light);
      background-color: var(--gray-light);
    }
  }

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
  <Label className={disabled ? 'disabled' : ''}>
    {label && <span>{label}</span>}
    <span className='wrapper'>
      <input
        type='checkbox'
        defaultChecked={checked}
        onChange={setChecked(!checked)}
      />
      <span className='toggle'></span>
    </span>
  </Label>
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
