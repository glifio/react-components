import React from 'react'
import styled from 'styled-components'
import { devices, space } from '../theme'
import { AppIconHeaderFooter } from '../Icons'

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

const A = styled.a`
  text-decoration: underline;
  color: inherit;
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
    gap: ${space()};
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

const AppIconStyled = styled(AppIconHeaderFooter)`
  @media (max-width: ${devices.tablet}) {
    margin-bottom: 2em;
  }

  @media (min-width: ${devices.tablet}) {
    position: absolute;
    left: 30px;
    top: 30px;
  }
`

export default function Footer() {
  return (
    <>
      <FooterWrapper>
        <AppIconStyled footer />
        <FooterContent>
          <Ul>
            <Li>
              <A
                href='https://discord.gg/8Hqm3qvK'
                target='_blank'
                rel='noopenner noreferrer'
              >
                Discord
              </A>
            </Li>
            <Li>
              <A
                href='https://blog.glif.io'
                target='_blank'
                rel='noopenner noreferrer'
              >
                Blog
              </A>
            </Li>
            <Li>
              <A
                href='https://github.com/glifio'
                target='_blank'
                rel='noopenner noreferrer'
              >
                Code
              </A>
            </Li>
            <Li>
              <A
                href='https://lotus.filecoin.io/docs/developers/hosted-lotus/'
                target='_blank'
                rel='noopenner noreferrer'
              >
                Nodes
              </A>
            </Li>
            <Li>
              <A href='mailto:squad@glif.io'>Contact</A>
            </Li>
          </Ul>

          <Ul>
            <Li>
              <A href={`${process.env.NEXT_PUBLIC_WALLET_URL}`}>Wallet</A>
            </Li>
            <Li>
              <A href={`${process.env.NEXT_PUBLIC_SAFE_URL}`}>Safe</A>
            </Li>
            <Li>
              <A href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}`}>Explorer</A>
            </Li>
            <Li>
              <A href={`${process.env.NEXT_PUBLIC_VERIFIER_URL}`}>Verifier</A>
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
