import { ReactNode } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PhishingBanner from '../PhishingBanner'
import { AppHeader, AppHeaderProps, AppHeaderPropTypes } from '../AppHeader'
import Footer from '../Footer'

import { devices } from '../theme'

const PageOuter = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1920px;
  margin: 0 auto;
  padding: var(--space-m);
  gap: var(--space-m);
`

const PageInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-m);

  @media (min-width: ${devices.tablet}) {
    min-height: calc(100vh - 2 * var(--space-m));
  }

  > * {
    flex: 0 0 auto;
  }
  > *:last-child {
    flex: 1 0 auto;
  }
`

const PageContent = styled(PageInner)`
  min-height: 0;
`

export function Page({
  children,
  preFooter,
  phishingUrl,
  hideAppHeader,
  ...appHeaderProps
}: PageProps) {
  return (
    <PageOuter>
      <PageInner>
        {phishingUrl && <PhishingBanner href={phishingUrl} />}
        {!hideAppHeader && <AppHeader {...appHeaderProps} />}
        <PageContent>{children}</PageContent>
      </PageInner>
      {preFooter}
      <Footer />
    </PageOuter>
  )
}

export type PageProps = {
  children: ReactNode
  preFooter?: ReactNode
  phishingUrl?: string
  hideAppHeader?: boolean
} & AppHeaderProps

export const PagePropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  preFooter: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  phishingUrl: PropTypes.string,
  hideAppHeader: PropTypes.bool,
  ...AppHeaderPropTypes
}

Page.propTypes = PagePropTypes
Page.defaultProps = {
  children: <main></main>
}
