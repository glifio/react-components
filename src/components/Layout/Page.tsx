import PropTypes from 'prop-types'
import styled from 'styled-components'

import PhishingBanner from '../PhishingBanner'
import { AppHeader, AppHeaderProps } from '../AppHeader'
import Footer from '../Footer'

import { space } from '../theme'

const PageOuter = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1920px;
  margin: 0 auto;
  padding: ${space()};
  padding-top: 0;
  gap: ${space()};
`

const PageInner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${space()});
  > * {
    flex: 0 0 auto;
  }
  > *:last-child {
    flex: 1 0 auto;
  }
  &.appHeaderHidden {
    padding-top: ${space()};
  }
`

export function Page({
  children,
  phishingUrl,
  hideAppHeader,
  ...appHeaderProps
}: PageProps) {
  return (
    <PageOuter>
      <PageInner className={hideAppHeader ? 'appHeaderHidden' : ''}>
        {phishingUrl && (
          <PhishingBanner
            href={phishingUrl}
            mt={hideAppHeader ? 0 : space()}
            mb={hideAppHeader ? space() : 0}
          />
        )}
        {!hideAppHeader && <AppHeader {...appHeaderProps} />}
        {children}
      </PageInner>
      <Footer />
    </PageOuter>
  )
}

export type PageProps = {
  children: JSX.Element | Array<JSX.Element>
  phishingUrl?: string
  hideAppHeader?: boolean
} & AppHeaderProps

Page.propTypes = {
  children: PropTypes.oneOfType([
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
