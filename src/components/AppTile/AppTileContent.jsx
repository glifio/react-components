import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { devices, fontSize, space } from '../theme'

export const AppTitleImg = styled.img`
  height: 100%;
  width: 100%;
  -o-object-fit: contain;
  object-fit: contain;
  position: absolute;
  top: 0;

  ${props =>
    props.soon &&
    css`
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
  font-size: ${fontSize('medium')};
  line-height: 1;

  ${props => props.soon && 'opacity: 0.3'}

  @media (max-width: ${devices.phone}) {
    padding: ${space('default', 'phone')};
  }
  @media (min-width: ${devices.gt.phone}) {
    padding: ${space('large')};
  }
`

AppTitleHeader.propTypes = {
  soon: PropTypes.bool
}

export const AppTitleContent = styled.div`
  color: #fff;
  background: #000;
  border-radius: 10px;
  overflow: hidden;

  ${props =>
    props.large &&
    css`
      position: relative;
      width: 100%;
      height: 100%;
    `}

  @media (max-width: ${devices.tablet}) {
    ${props =>
      props.small &&
      css`
        height: 60vw;
        position: relative;
      `}
  }

  @media (max-width: ${devices.phone}) {
    ${props =>
      props.small &&
      css`
        height: 90vw;
        position: relative;
      `}
  }

  @media (min-width: ${devices.gt.tablet}) {
    ${props =>
      props.small &&
      css`
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
  z-index: 1;
  font-size: ${fontSize('medium')};
  line-height: 1.3;

  ${props =>
    !props.large
      ? css`
          @media (min-width: ${devices.gt.phone}) and (hover: hover) {
            opacity: 0;
            transition: opacity 0.4s;
            background: rgba(0, 0, 0, 0.7);
          }
          @media (min-width: ${devices.gt.phone}) and (hover: none) {
            background: rgba(0, 0, 0, 0.6);
          }

          &:hover {
            opacity: 1;
          }
        `
      : `
      pointer-events: none;
    `}

  @media (max-width: ${devices.tablet}) {
    width: 100%;
    white-space: normal;
    font-size: ${fontSize('small', 'phone')};
    padding: 15px 5px 0 ${space('default', 'phone')};
  }
  @media (min-width: ${devices.gt.tablet}) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    padding: ${space('large')};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 10px;
    background-image: url(${props => props.imgSrcHover});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0;
  }
`

AppTitleHover.propTypes = {
  large: PropTypes.bool
}

AppTitleHover.defaultProps = {
  large: false
}
