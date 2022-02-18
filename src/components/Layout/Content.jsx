import styled from 'styled-components'
import { devices, space } from '../theme'

export const OneColumn = styled.div`
  padding: 0 2rem;

  @media (min-width: ${devices.tablet}) {
    padding: 0 3rem;
  }
`
