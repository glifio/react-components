import styled from 'styled-components'
import { color, typography, layout, space, grid, position } from 'styled-system'

export const StyledATag = styled.a.attrs(props => ({
  color: 'core.primary',
  fontSize: 2,
  target: props.target || '_blank',
  ...props
}))`
  text-decoration: none;
  transition: 0.18s ease-in-out;
  border-bottom: 2px solid ${props => props.theme.colors.core.primary}00;
  &:hover {
    border-bottom: 2px solid ${props => props.theme.colors.core.primary};
  }
  ${color}
  ${typography}
  ${layout}
  ${position}
  ${grid}
  ${space}
`
