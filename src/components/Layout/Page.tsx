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
  gap: ${space()};
`

const PageInner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 2 * ${space()});
  gap: ${space()};
  > * {
    flex: 0 0 auto;
  }
  > *:last-child {
    flex: 1 0 auto;
  }
`

export function Page({ children, phishingUrl, ...rest }: PageProps) {
  return (
    <PageOuter>
      <PageInner>
        {phishingUrl && <PhishingBanner href={phishingUrl} />}
        <AppHeader {...rest} />
        {children}
      </PageInner>
      <Footer />
    </PageOuter>
  )
}

export type PageProps = {
  children: JSX.Element | Array<JSX.Element>
  phishingUrl?: string
} & AppHeaderProps

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  phishingUrl: PropTypes.string,
  ...AppHeader.propTypes
}

Page.defaultProps = {
  children: <main></main>
}
