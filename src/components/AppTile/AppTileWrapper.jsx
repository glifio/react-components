import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { devices, fontSize, space } from '../theme'

export const AppTileWrapper = styled.a`
  position: relative;
  font-size: ${fontSize('large')};
  line-height: 1.3em;
  display: block;
  text-decoration: none;
  color: inherit;

  &:hover {
    opacity: 1;
  }

  ${props =>
    props.large &&
    css`
      height: 100%;
    `}

  @media (min-width: ${devices.gt.tablet}) {
    width: 100%;
    overflow: hidden;

    ${props =>
      props.small &&
      css`
        padding-bottom: 144%;
      `}

  @media (max-width: ${devices.tablet}) {
    ${props =>
      props.small &&
      css`
        width: 45vw;
        scroll-snap-align: start;
        padding-left: ${space('default', 'default')};
        flex-shrink: 0;
      `}

    ${props => props.soon && 'display: none;'}
  }

  @media (max-width: ${devices.phone}) {
    ${props =>
      props.small &&
      css`
        width: 70vw;
        scroll-snap-align: start;
        padding-left: ${space('default', 'phone')};
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
