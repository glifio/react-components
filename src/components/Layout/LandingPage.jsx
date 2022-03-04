import styled from 'styled-components'
import { devices } from '../theme'
import { OneColumn, TwoColumns } from './Content'

export const LandingPageColumns = styled(TwoColumns)`
  > *:first-child {
    height: 250px;

    @media (min-width: ${devices.tablet}) {
      height: 100%;
    }
  }
`

export const LandingPageContent = styled(OneColumn)`
  > p {
    font-size: 1.125rem;

    &:first-of-type {
      margin-top: 3rem;
    }
  }
`
