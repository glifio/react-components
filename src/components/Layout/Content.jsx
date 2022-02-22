import styled from 'styled-components'
import { devices, space } from '../theme'

export const OneColumn = styled.div`
  padding: 2rem 1.5rem;

  @media (min-width: ${devices.tablet}) {
    padding: 2rem 3rem;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`

export const TwoColumns = styled(OneColumn)`
  display: flex;
  flex-direction: column;
  gap: ${space()};

  @media (min-width: ${devices.tablet}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`
