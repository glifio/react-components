import styled, { css, keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../theme'

const LoadingIconAnimation = keyframes`
  20% { transform: translate(0, 0) }
  40% { transform: translate(100%, 0) }
  60% { transform: translate(100%, 100%) }
  80% { transform: translate(0, 100%) }
  100% { transform: translate(0, 0) }
`

const LoadingIconEl = styled.span`
  position: relative;
  display: inline-block;
  background-color: ${Colors.PURPLE_MEDIUM};

  ${props => css`
    width: ${props.size};
    height: ${props.size};
    margin: ${props.margin};
  `}

  &:after {
    position: absolute;
    display: block;
    content: '';
    top: 0;
    left: 0;
    background-color: ${Colors.PURPLE_DARK};
    animation-name: ${LoadingIconAnimation};
    animation-duration: 2s;
    animation-iteration-count: infinite;

    ${props => css`
      width: calc(${props.size} * 0.5);
      height: calc(${props.size} * 0.5);
    `}
  }
`

export const LoadingIcon = ({ size, margin }: LoadingIconProps) => (
  <LoadingIconEl size={size} margin={margin} />
)

interface LoadingIconProps {
  size?: string
  margin?: string
}

LoadingIcon.propTypes = {
  size: PropTypes.string,
  margin: PropTypes.string
}

LoadingIcon.defaultProps = {
  size: '3em',
  margin: '0'
}
