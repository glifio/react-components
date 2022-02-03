import styled, { css } from 'styled-components'
import { layout, space } from 'styled-system'
import PropTypes from 'prop-types'

const ButtonV2 = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  cursor: pointer;

  gap: 0.75rem;
  padding: 0.5em 0.75em;
  
  border: 1px solid black;
  border-radius: 8px;
  
  color: black;
  background: transparent;

  ${props =>
    css`
      &:hover {
        color: ${props.theme.colors.core.primary};
        border-color: ${props.theme.colors.core.primary};
      }
    `}

  ${props =>
    props.large &&
    css`
      font-size: 1.25em;
    `}

  ${props =>
    props.white &&
    css`
      color: white;
      border-color: white;
    `}

  ${props =>
    props.disabled &&
    css`
      cursor: default;
      color: ${props.theme.colors.gray.medium};
      border-color: ${props.theme.colors.gray.medium};
      pointer-events: none;
    `}

  ${layout}
  ${space}
`

ButtonV2.propTypes = {
  large: PropTypes.bool,
  white: PropTypes.bool,
  disabled: PropTypes.bool
}

ButtonV2.defaultProps = {
  large: false,
  white: false,
  disabled: false
}

export default ButtonV2
