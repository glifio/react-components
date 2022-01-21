import styled, { css } from 'styled-components'
import { devices, space } from '../theme'

export const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space()};
  margin: ${space()};
`

export const LandingPageContentContainer = styled.div`
  display: grid;
  gap: ${space()};

  @media (min-width: ${devices.tablet}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${devices.tablet}) {
    grid-template-columns: 1fr;
  }
`
