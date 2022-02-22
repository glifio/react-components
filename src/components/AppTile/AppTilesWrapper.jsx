import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { devices, space } from '../theme'

export const AppTilesWrapper = styled.div`
  gap: ${space()};

  @media (max-width: ${devices.tablet}) {
    margin-top: calc(${space('large', 'phone')} * 2);
    margin-bottom: calc(${space('large', 'phone')} * 2);
    display: flex;
    overflow-x: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -ms-scroll-snap-type: x mandatory;
    scroll-snap-type: x mandatory;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (min-width: ${devices.tablet}) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`

AppTilesWrapper.defaultProps = {
  children: <></>
}

AppTilesWrapper.propTypes = {
  children: PropTypes.node
}
