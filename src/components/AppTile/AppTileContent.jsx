import PropTypes from 'prop-types'
import styled from 'styled-components'
import { devices, fontSize, margin } from '../theme'

export const AppTitleImg = styled.img`
  height: 100%;
  width: 100%;
  -o-object-fit: contain;
  object-fit: contain;
  position: absolute;
  top: 0;

  ${props =>
    props.soon &&
    `
    opacity: 0.3;
    filter: blur(30px);
  `}
`

AppTitleImg.propTypes = {
  soon: PropTypes.bool
}

export const AppTitleHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 2;

  ${props =>
    props.soon &&
    `
    opacity: 0.3
  `}

  @media (max-width: ${devices.phone}) {
    padding: ${margin()};
  }
  @media (min-width: ${devices.gt.phone}) {
    padding: ${margin('large')};
  }
`

AppTitleHeader.propTypes = {
  soon: PropTypes.bool
}

export const AppTitleContent = styled.div`
  color: #fff;
  background: #000;
  border-radius: 10px;

  ${props =>
    props.large &&
    `
    position: relative;
    width: 100%;
    height: 100%;
  `}

  @media (max-width: ${devices.phone}) {
    ${props =>
      props.small &&
      `
        height: 90vw;
        position: relative;
      `}
  }

  @media (min-width: ${devices.gt.phone}) {
    ${props =>
      props.small &&
      `
        position: absolute;
        width: 100%;
        height: 100%;
      `}
  }
`

AppTitleContent.propTypes = {
  small: PropTypes.bool,
  large: PropTypes.bool
}

export const AppTitleHover = styled.div`
  &:hover {
    opacity: 1;
  }

  z-index: 1;
  line-height: 1.3em;

  @media (max-width: ${devices.phone}) {
    width: 100%;
    white-space: normal;
    font-size: ${fontSize('small', 'phone')};
    padding: 15px 5px 0 30px;
  }
  @media (min-width: ${devices.gt.phone}) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    padding: ${margin('large')};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    pointer-events: none;
    border-radius: 10px;
  }
  @media (min-width: ${devices.gt.phone}) and (hover: hover) {
    opacity: 0;
    transition: opacity 0.4s;
    background: rgba(0, 0, 0, 0.7);
  }
  @media (min-width: ${devices.gt.phone}) and (hover: none) {
    background: rgba(0, 0, 0, 0.6);
  }
`
