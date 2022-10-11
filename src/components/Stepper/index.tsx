import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../theme'

const StepperEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 1em;

  ${props =>
    props.error &&
    css`
      color: ${Colors.RED_MEDIUM};
    `}

  .dots {
    display: flex;
    gap: 0.25em;

    div {
      width: 0.5em;
      height: 0.5em;
      border-radius: 50%;
      background-color: ${Colors.GRAY_LIGHT};

      &.active {
        background-color: ${props =>
          props.error ? Colors.RED_MEDIUM : Colors.GREEN_MEDIUM};
      }
    }
  }
`

export const Stepper = ({ step, steps, error }: StepperProps) => (
  <StepperEl error={error}>
    <span>Step {step}</span>
    <div className='dots'>
      {new Array(steps).fill(null).map((_, i) => (
        <div key={i} className={step > i ? 'active' : ''} />
      ))}
    </div>
  </StepperEl>
)

interface StepperProps {
  step: number
  steps: number
  error?: boolean
}

Stepper.propTypes = {
  step: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired,
  error: PropTypes.bool
}
