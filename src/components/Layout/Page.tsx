import { ReactNode } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PhishingBanner from '../PhishingBanner'
import { AppHeader, AppHeaderProps } from '../AppHeader'
import Footer from '../Footer'

import { devices, space } from '../theme'

const PageOuter = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1920px;
  margin: 0 auto;
  padding: ${space()};
  gap: ${space()};
`

const PageInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space()};

  @media (min-width: ${devices.tablet}) {
    min-height: calc(100vh - 2 * ${space()});
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

Page.propTypes = {
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
  ...AppHeader.propTypes
}

Page.defaultProps = {
  children: <main></main>
}
