import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'
import { devices, fontSize } from '../theme'

const transitionIn = keyframes`
from {
  opacity: 0;
  transform: scale(1.25)
}

to {
  opacity: 1;
  transform: scale(1.35)
}
`

export const AppTitleImg = styled.img`
  height: 100%;
  width: 100%;
  -o-object-fit: contain;
  object-fit: contain;
  position: absolute;
  top: 0;

  &.default {
    ${props =>
      props.soon &&
      css`
        opacity: 0.3;
        filter: blur(30px);
      `}
  }

  @media (hover: hover) {
    &.hover {
      ${props =>
        props.large &&
        css`
          opacity: 0;
          animation-name: ${transitionIn};
          animation-delay: 0.5s;
          animation-duration: 3s;
          animation-fill-mode: forwards;
          transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        `}
    }
  }

  ${props =>
    props.title === 'Sender' &&
    css`
      margin-top: -15%;
      margin-left: 4%;
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
    padding: var(--space-m);
  }
  @media (min-width: ${devices.phone}) {
    padding: var(--space-l);
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

  @media (min-width: ${devices.tablet}) {
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

export const AppTitleDescription = styled.div`
  z-index: 1;
  font-size: ${fontSize('medium')};
  line-height: 1.3;

  ${props =>
    !props.large
      ? css`
          @media (min-width: ${devices.phone}) and (hover: hover) {
            opacity: 0;
            transition: opacity 0.5s;
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
    padding: 15px 5px 0 var(--space-m);
  }
  @media (min-width: ${devices.tablet}) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    padding: var(--space-l);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 10px;

    ${props =>
      props.small &&
      css`
        opacity: 0;
      `}
  }
`

AppTitleDescription.propTypes = {
  large: PropTypes.bool,
  small: PropTypes.bool
}

AppTitleDescription.defaultProps = {
  large: false,
  small: true
}
