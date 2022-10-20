import styled from 'styled-components'
import { SmartLink } from '../SmartLink'
import { Colors, devices, Spaces } from '../theme'
import { IconGlif } from '../Icons'
import { useEnvironment } from '../../services/EnvironmentProvider'
import { NODES_DOCS_URL } from '../../constants'

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: 0;
`

const Li = styled.li`
  list-style-type: none;
  margin: 0;
  padding-left: 0;
`

const FooterWrapper = styled.footer`
  background: #272727;
  border-radius: 8px;
  padding: 30px;
  color: white;
  position: relative;
`

const FooterContent = styled.div`
  @media (min-width: ${devices.tablet}) {
    max-width: 670px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${Spaces.MEDIUM};
    margin: 0 auto;
  }
`

const Address = styled.div`
  @media (max-width: ${devices.tablet}) {
    margin-top: 2em;
  }
`

const Copyright = styled.div`
  text-transform: uppercase;
  display: block;

  @media (min-width: ${devices.tablet}) {
    margin-top: 1em;
  }

  @media (max-width: ${devices.tablet}) {
    margin-top: 5em;
  }
`

const AppIconWrapper = styled.span`
  display: inline-block;
  height: 35px;
  margin-bottom: 1.75em;

  @media (min-width: ${devices.phone}) {
    height: 45px;
    margin-bottom: 2em;
  }

  @media (min-width: ${devices.tablet}) {
    position: absolute;
    left: 30px;
    top: 30px;
    height: 55px;
    margin-bottom: 0;
  }

  svg {
    width: auto;
    height: 100%;
  }
`

export const Footer = () => {
  const {
    walletUrl,
    safeUrl,
    explorerUrl,
    verifierUrl,
    blogUrl,
    githubUrl,
    discordUrl,
    contactEmail
  } = useEnvironment()
  return (
    <>
      <FooterWrapper>
        <AppIconWrapper>
          <IconGlif color={Colors.WHITE} />
        </AppIconWrapper>
        <FooterContent>
          <Ul>
            <Li>
              <SmartLink href={discordUrl}>Discord</SmartLink>
            </Li>
            <Li>
              <SmartLink href={blogUrl}>Blog</SmartLink>
            </Li>
            <Li>
              <SmartLink href={githubUrl}>Code</SmartLink>
            </Li>
            <Li>
              <SmartLink href={NODES_DOCS_URL}>Nodes</SmartLink>
            </Li>
            <Li>
              <SmartLink href={`mailto:${contactEmail}`}>Contact</SmartLink>
            </Li>
          </Ul>

          <Ul>
            <Li>
              <SmartLink href={walletUrl}>Wallet</SmartLink>
            </Li>
            <Li>
              <SmartLink href={safeUrl}>Safe</SmartLink>
            </Li>
            <Li>
              <SmartLink href={explorerUrl}>Explorer</SmartLink>
            </Li>
            <Li>
              <SmartLink href={verifierUrl}>Verifier</SmartLink>
            </Li>
          </Ul>

          <Address>
            GLIF
            <br />
            Freeport, Grand Bahamas
          </Address>

          <Copyright>2022 Glif for life</Copyright>
        </FooterContent>
      </FooterWrapper>
    </>
  )
}
