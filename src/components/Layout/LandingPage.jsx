import styled from 'styled-components'
import { devices, space, fontSize } from '../theme'
import { OneColumn } from './Content'

export const LandingPageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${space()};

  @media (min-width: ${devices.tablet}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`

export const LandingPageAppTile = styled.div`
  height: 250px;

  @media (min-width: ${devices.tablet}) {
    height: 100%;
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
