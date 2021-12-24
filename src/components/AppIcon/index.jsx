import React from 'react'
import styled from 'styled-components'
import { devices } from '../theme'

const Icon = styled.img`
  height: auto;

  @media (max-width: ${devices.phone}) {
    width: 25px;
  }

  @media (min-width: ${devices.phone}) and (max-width: ${devices.tablet}) {
    width: 30px;
  }

  @media (min-width: ${devices.tablet}) {
    width: 40px;
  }
`

export default function AppIcon({ iconPath }) {
  return <Icon src={iconPath} />
}
