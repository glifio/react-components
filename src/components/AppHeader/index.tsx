import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { ButtonV2 } from '../Button/V2'
import { SmartLink } from '../SmartLink'
import { AppIconHeaderFooter } from '../Icons'
import { LabeledText, LabeledTextProps } from '../LabeledText'
import { AddressLink, AddressLinkProps } from '../LabeledText/AddressLink'
import { Colors } from '../theme'

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  padding: var(--space-m) 0;
  margin: var(--space-nm) 0;
  background-color: ${Colors.WHITE_BROKEN};

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: var(--space-l);
  row-gap: var(--space-m);
`

const NavLeft = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  gap: var(--space-l);
  flex-grow: 1;
`

const NavRight = styled(NavLeft)`
  gap: var(--space-m);
  flex-grow: 0;
`

const NavLinkSimple = styled(SmartLink)`
  color: black;
  text-decoration: none;

  &:hover {
    color: black;
  }
`

const NavLinkRound = styled(NavLinkSimple)`
  padding: 0.5em 0.75em;
  border: 1px solid black;
  border-radius: 2em;

  &:hover,
  &.active {
    color: ${Colors.PURPLE_MEDIUM};
    border-color: ${Colors.PURPLE_MEDIUM};
  }

  &:active {
    color: white;
    background: ${Colors.PURPLE_MEDIUM};
  }
`

const NavButton = styled(ButtonV2)`
  border-radius: 2em;
`

export function AppHeader(props: AppHeaderProps) {
  const router = useRouter()
  const {
    logout,
    connection,
    appIcon,
    appUrl,
    addressLinks,
    labeledTexts,
    customHeaderComps,
    appHeaderLinks
  } = props
  return (
    <Header>
      <NavLeft>
        {appIcon &&
          (appUrl ? (
            <NavLinkSimple href={appUrl}>{appIcon}</NavLinkSimple>
          ) : (
            appIcon
          ))}
        {addressLinks?.map((addressLink, index) => (
          <AddressLink key={index} {...addressLink} />
        ))}
        {labeledTexts?.map((labeledText, index) => (
          <LabeledText key={index} {...labeledText} />
        ))}
        {customHeaderComps}
        {connection}
      </NavLeft>
      <NavRight>
        {appHeaderLinks &&
          appHeaderLinks.map((link, index) => (
            <NavLinkRound
              key={index}
              href={link.url}
              className={link.url === router?.pathname ? 'active' : ''}
            >
              {link.title}
            </NavLinkRound>
          ))}
        {logout && <NavButton onClick={logout}>Logout</NavButton>}
      </NavRight>
    </Header>
  )
}

export interface AppHeaderProps {
  logout?: () => void
  connection?: JSX.Element
  appIcon?: JSX.Element
  appUrl?: string
  addressLinks?: Array<AddressLinkProps>
  labeledTexts?: Array<LabeledTextProps>
  customHeaderComps?: React.ReactNode
  appHeaderLinks?: Array<{
    title: string
    url: string
  }>
}

export const AppHeaderPropTypes = {
  logout: PropTypes.func,
  connection: PropTypes.node,
  appIcon: PropTypes.node,
  appUrl: PropTypes.string,
  addressLinks: PropTypes.arrayOf(PropTypes.shape(AddressLink.propTypes)),
  labeledTexts: PropTypes.arrayOf(PropTypes.shape(LabeledText.propTypes)),
  customHeaderComps: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  appHeaderLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
}

AppHeader.propTypes = AppHeaderPropTypes
AppHeader.defaultProps = {
  appIcon: <AppIconHeaderFooter iconStyle='dark' />,
  appUrl: '/'
}
