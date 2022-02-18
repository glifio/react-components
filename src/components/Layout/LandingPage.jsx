import styled from 'styled-components'
import { devices, fontSize } from '../theme'
import { OneColumn, TwoColumns } from './Content'

export const LandingPageColumns = styled(TwoColumns)`
  padding: 0;

  > *:first-child {
    height: 250px;

    @media (min-width: ${devices.tablet}) {
      height: 100%;
    }
  }
`

export const LandingPageContent = styled(OneColumn)`
  h2 {
    margin: 1em 0;
    font-size: ${fontSize('large')};
  }

  > p {
    font-size: 1.125rem;

    &:first-of-type {
      margin-top: 3rem;
    }

    &:last-of-type {
      margin-bottom: 3rem;
    }
  }
`
