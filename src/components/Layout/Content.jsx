import styled from 'styled-components'
import { devices, space } from '../theme'

export const OneColumn = styled.div`
  padding: 0 2rem;

  @media (min-width: ${devices.tablet}) {
    padding: 0 3rem;
  }
`

export const TwoColumns = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space()};
  padding: 0 3rem;

  @media (min-width: ${devices.tablet}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`
