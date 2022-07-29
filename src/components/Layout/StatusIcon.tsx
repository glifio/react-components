import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const StatusIconEl = styled.div`
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;

  &:after {
    position: absolute;
    display: block;
    content: '';
    top: 50%;
    left: 50%;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  ${props => {
    switch (props.color) {
      case 'purple':
      case 'green':
      case 'red':
      case 'gray':
        // Use "medium" color
        return css`
          border-color: var(--${props.color}-medium);
          &:after {
            background-color: var(--${props.color}-medium);
          }
        `
      case 'yellow':
      case 'blue':
        // Use "dark" color
        return css`
          border-color: var(--${props.color}-dark);
          &:after {
            background-color: var(--${props.color}-dark);
          }
        `
    }
  }}  
`

export const StatusIcon = ({ color }: StatusIconProps) => (
  <StatusIconEl color={color} />
)

type StatusIconProps = {
  color: 'purple' | 'green' | 'yellow' | 'red' | 'blue' | 'gray'
}

StatusIcon.propTypes = {
  color: PropTypes.oneOf(['purple', 'green', 'yellow', 'red', 'blue', 'gray'])
}

StatusIcon.defaultProps = {
  color: 'gray'
}
