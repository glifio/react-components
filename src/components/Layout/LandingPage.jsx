import styled from 'styled-components'
import { devices, space, fontSize } from '../theme'

export const LandingPageOuter = styled.div`
  display: flex;
  gap: ${space()};
  margin: ${space()};
  flex-direction: column;

  @media (min-width: ${devices.tablet}) {
    height: calc(100vh - 2 * ${space()});
    > * {
      flex: 0 0 auto;
    }
    > *:last-child {
      flex: 1 1 auto;
    }
  }
`

export const LandingPageInner = styled.div`
  display: grid;
  gap: ${space()};
  grid-template-columns: 1fr;

  @media (min-width: ${devices.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`

export const LandingPageAppTile = styled.div`
  height: 250px;

  @media (min-width: ${devices.tablet}) {
    height: 100%;
  }
`

export const LandingPageContent = styled.div`
  padding: 3rem 2rem;

  @media (min-width: ${devices.tablet}) {
    padding: 1.25rem 3rem;
  }

  h2 {
    margin: 0 0 1em 0;
    font-size: ${fontSize('large')};
  }

  p {
    font-size: 1.125rem;
  }
`
