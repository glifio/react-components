import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { devices, margin } from '../theme'

export const AppTilesWrapper = styled.div`
  @media (max-width: ${devices.phone}) {
    display: flex;
    white-space: nowrap;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    width: calc(100% + ${margin('default', 'phone')});
    margin-left: calc(${margin('default', 'phone')} * -1);
    margin-top: calc(${margin('large', 'phone')} * 2);
    margin-bottom: calc(${margin('large', 'phone')} * 2);
    padding: 0 ${margin('default', 'phone')};
    -ms-scroll-snap-type: x mandatory;
    scroll-snap-type: x mandatory;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  @media (min-width: ${devices.gt.phone}) {
    display: grid;
    grid-gap: ${margin()};
    gap: ${margin()};
  }
  @media (min-width: ${devices.gt.phone}) and (max-width: ${devices.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${devices.gt.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

AppTilesWrapper.defaultProps = {
  children: <></>
}

AppTilesWrapper.propTypes = {
  children: PropTypes.node
}
