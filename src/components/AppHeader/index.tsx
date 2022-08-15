import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { SmartLink } from '../SmartLink'
import { AppIconHeaderFooter } from '../Icons'
import { LabeledText, LabeledTextProps } from '../LabeledText'
import { AddressLink, AddressLinkProps } from '../LabeledText/AddressLink'

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  padding: var(--space-m) 0;
  margin: var(--space-nm) 0;
  background-color: var(--white-broken);

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
  gap: 0;
  flex-grow: 0;
  align-items: stretch;
`

const navItemStyle = css`
  display: flex;
  align-items: flex-end;
  padding: 0 var(--space-m);
  transition: color 0.1s ease-out;
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &.active {
    color: var(--purple-medium);
  }
`

const NavLink = styled(SmartLink)`
  ${navItemStyle}
`

const NavButton = styled.span`
  ${navItemStyle}
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
            <SmartLink href={appUrl}>{appIcon}</SmartLink>
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
            <NavLink
              key={index}
              href={link.url}
              className={link.url === router?.pathname ? 'active' : ''}
            >
              {link.title}
            </NavLink>
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
