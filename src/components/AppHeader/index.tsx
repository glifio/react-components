import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { SmartLink } from '../SmartLink'
import { IconGlif } from '../Icons'
import { LabeledText, LabeledTextProps } from '../LabeledText'
import { AddressLink, AddressLinkProps } from '../LabeledText/AddressLink'
import { Colors, devices, Spaces } from '../theme'

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  padding: ${Spaces.MEDIUM} 0;
  margin: ${Spaces.N_MEDIUM} 0;
  background-color: ${Colors.WHITE_BROKEN};

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: ${Spaces.LARGE};
  row-gap: ${Spaces.MEDIUM};
`

const NavLeft = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  gap: ${Spaces.LARGE};
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
  padding: 0 ${Spaces.MEDIUM};
  transition: color 0.1s ease-out;
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &.active {
    color: ${Colors.PURPLE_MEDIUM};
  }
`

const NavLink = styled(SmartLink)`
  ${navItemStyle}
`

const NavButton = styled.span`
  ${navItemStyle}
`

const AppIconWrapper = styled.span`
  display: inline-block;
  height: 35px;

  @media (min-width: ${devices.phone}) {
    height: 45px;
  }

  @media (min-width: ${devices.tablet}) {
    height: 55px;
  }

  svg {
    width: auto;
    height: 100%;
  }
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
            <SmartLink href={appUrl}>
              <AppIconWrapper>{appIcon}</AppIconWrapper>
            </SmartLink>
          ) : (
            <AppIconWrapper>{appIcon}</AppIconWrapper>
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
  appIcon: <IconGlif />,
  appUrl: '/'
}
