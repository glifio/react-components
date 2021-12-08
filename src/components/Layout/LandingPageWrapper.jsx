import styled from 'styled-components'
import { devices, margin } from '../theme'

export const LandingPageContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const LandingPageContentContainer = styled.div`
  padding: ${margin()};

  @media (min-width: ${devices.gt.tablet}) {
    display: flex;
    flex: 1;
  }
`
