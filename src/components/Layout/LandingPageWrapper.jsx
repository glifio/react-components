import styled, { css } from 'styled-components'
import { devices, space } from '../theme'

export const LandingPageContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const LandingPageContentContainer = styled.div`
  padding: ${space()};
  padding-bottom: 0;
  gap: ${space()};
  display: grid;

  @media (min-width: ${devices.gt.tablet}) {
    min-height: 100vh;
    grid-template-columns: 1fr 1fr;

    ${props =>
      !props.phishingBannerClosed &&
      css`
        grid-template-rows: 50px auto;
        grid-template-areas:
          'banner banner'
          'icon content';
      `}
  }

  @media (max-width: ${devices.tablet}) {
    grid-template-columns: 1fr;

    ${props =>
      !props.phishingBannerClosed &&
      css`
        grid-template-rows: auto;
        grid-template-areas:
          'banner'
          'icon'
          'content';
      `}
  }
`
