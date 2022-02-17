import PropTypes from 'prop-types'
import styled from 'styled-components'

import PhishingBanner from '../PhishingBanner'
import AppHeader from '../AppHeader'
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
    flex: 1 1 auto;
  }
`

export function Page(props: PageProps) {
  const { children, phishingUrl } = props
  return (
    <PageOuter>
      <PageInner>
        {phishingUrl && <PhishingBanner href={phishingUrl} />}
        <AppHeader
          homeUrl={props.homeUrl}
          blogUrl={props.blogUrl}
          codeUrl={props.codeUrl}
          nodesUrl={props.nodesUrl}
          safeUrl={props.safeUrl}
          walletUrl={props.walletUrl}
          verifierUrl={props.verifierUrl}
          explorerUrl={props.explorerUrl}
        />
        {children}
      </PageInner>
      <Footer />
    </PageOuter>
  )
}

interface PageProps {
  children: JSX.Element | Array<JSX.Element>
  phishingUrl?: string
  homeUrl?: string
  blogUrl?: string
  codeUrl?: string
  nodesUrl?: string
  safeUrl?: string
  walletUrl?: string
  verifierUrl?: string
  explorerUrl?: string
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  phishingUrl: PropTypes.string,
  homeUrl: PropTypes.string,
  blogUrl: PropTypes.string,
  codeUrl: PropTypes.string,
  nodesUrl: PropTypes.string,
  safeUrl: PropTypes.string,
  walletUrl: PropTypes.string,
  verifierUrl: PropTypes.string,
  explorerUrl: PropTypes.string
}

Page.defaultProps = {
  children: <main></main>
}
