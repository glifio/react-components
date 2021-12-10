import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { devices, space } from '../theme'

export const AppTilesWrapper = styled.div`
  @media (max-width: ${devices.tablet}) {
    display: flex;
    white-space: nowrap;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    width: calc(100% + ${space('default', 'phone')});
    margin-left: calc(${space('default', 'phone')} * -1);
    margin-top: calc(${space('large', 'phone')} * 2);
    margin-bottom: calc(${space('large', 'phone')} * 2);
    padding: 0 ${space('default', 'phone')};
    -ms-scroll-snap-type: x mandatory;
    scroll-snap-type: x mandatory;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  @media (min-width: ${devices.gt.tablet}) {
    display: grid;
    grid-gap: ${space()};
    gap: ${space()};
    grid-template-columns: repeat(3, 1fr);
  }
`

AppTilesWrapper.defaultProps = {
  children: <></>
}

AppTilesWrapper.propTypes = {
  children: PropTypes.node
}
