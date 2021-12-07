import React from 'react'
import styled from 'styled-components'
import { devices, fontSize, margin } from '../theme'
import AppIcon from '../AppIcon'

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
  @media (min-width: ${devices.gt.tablet}) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${margin()};
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

  @media (min-width: ${devices.gt.tablet}) {
    margin-top: 1em;
  }

  @media (max-width: ${devices.tablet}) {
    margin-top: 5em;
  }
`

const AppIconStyled = styled(AppIcon)`
  @media (max-width: ${devices.tablet}) {
    margin-bottom: 2em;
  }

  @media (min-width: ${devices.gt.tablet}) {
    position: absolute;
    left: 30px;
    top: 30px;
  }
`

export default function Footer() {
  return (
    <FooterWrapper>
      <AppIconStyled iconPath='./logo-glif-white.svg' />
      <FooterContent>
        <Ul>
          <Li>
            <A href='#'>Blog</A>
          </Li>
          <Li>
            <A href='#'>Code</A>
          </Li>
          <Li>
            <A href='#'>Nodes</A>
          </Li>
          <Li>
            <A href='#'>Contact</A>
          </Li>
        </Ul>

        <Ul>
          <Li>
            <A href='#'>Wallet</A>
          </Li>
          <Li>
            <A href='#'>Safe</A>
          </Li>
          <Li>
            <A href='#'>Verifier</A>
          </Li>
        </Ul>

        <Address>
          GLIF
          <br />
          PO Box #12345
          <br />
          NY, NY 10002
          <br />
          USA
        </Address>

        <Copyright>2021 Glif for life</Copyright>
      </FooterContent>
    </FooterWrapper>
  )
}
