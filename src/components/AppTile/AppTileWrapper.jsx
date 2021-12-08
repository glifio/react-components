import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { devices, fontSize, margin } from '../theme'

export const AppTileWrapper = styled.a`
  position: relative;
  font-size: ${fontSize('large')};
  line-height: 1.3em;
  display: block;

  &:hover {
    opacity: 1;
  }

  @media (min-width: ${devices.gt.phone}) {
    width: 100%;
    overflow: hidden;
    padding-bottom: 144%;
  }

  @media (max-width: ${devices.phone}) {
    ${props =>
      props.small &&
      css`
        width: 70vw;
        scroll-snap-align: start;
        padding-left: ${margin('default', 'phone')};
        flex-shrink: 0;
      `}

    ${props => props.soon && 'display: none;'}
  }

  ${props =>
    props.large &&
    css`
      cursor: default;
      pointer-events: none;
      padding-bottom: 0;
      overflow: hidden;
    `}
`

AppTileWrapper.propTypes = {
  small: PropTypes.bool,
  large: PropTypes.bool,
  soon: PropTypes.bool
}
