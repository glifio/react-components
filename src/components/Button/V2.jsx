import styled, { css } from 'styled-components'
import { layout, space } from 'styled-system'
import PropTypes from 'prop-types'
import { fontSize, devices } from '../theme'

const ButtonV2 = styled.button`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5em 0.75em;
  border-radius: ${props => (props.round ? '100px' : '8px')};

  ${props =>
    props.large &&
    css`
      font-size: ${fontSize('medium')};

      @media (max-width: ${devices.phone}) {
        font-size: ${fontSize('medium', 'phone')};
      }
    `};

  ${props =>
    props.small &&
    css`
      font-size: ${fontSize('default')};

      @media (max-width: ${devices.phone}) {
        font-size: ${fontSize('default', 'phone')};
      }
    `};

  ${props =>
    props.black &&
    css`
      border: 1px solid black;
      color: black;
      background: transparent;

      ${!props.disabled &&
      `&:hover {
        color: ${props.theme.colors.core.primary};
        border-color: ${props.theme.colors.core.primary};
      }`}
    `};

  ${props =>
    props.white &&
    css`
      border: 1px solid white;
      color: white;
    `};

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: default;
    `}

  ${layout}
  ${space}
`

ButtonV2.propTypes = {
  round: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  black: PropTypes.bool,
  white: PropTypes.bool
}

ButtonV2.defaultProps = {
  large: true,
  black: true
}

export default ButtonV2
