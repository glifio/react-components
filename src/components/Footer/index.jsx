import React from 'react'
import styled from 'styled-components'
import { SmartLink } from '../Link/SmartLink'
import { devices, space } from '../theme'
import { AppIconHeaderFooter } from '../Icons'
import {
  GLIF_EMAIL,
  GLIF_CODE,
  GLIF_NODES,
  GLIF_DISCORD,
  GLIF_BLOG
} from '../../constants'

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
    gap: var(--space-m);
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
              <SmartLink href={GLIF_DISCORD}>Discord</SmartLink>
            </Li>
            <Li>
              <SmartLink href={GLIF_BLOG}>Blog</SmartLink>
            </Li>
            <Li>
              <SmartLink href={GLIF_CODE}>Code</SmartLink>
            </Li>
            <Li>
              <SmartLink href={GLIF_NODES}>Nodes</SmartLink>
            </Li>
            <Li>
              <SmartLink href={`mailto:${GLIF_EMAIL}`}>Contact</SmartLink>
            </Li>
          </Ul>

          <Ul>
            <Li>
              <SmartLink href='https://wallet.glif.io'>Wallet</SmartLink>
            </Li>
            <Li>
              <SmartLink href='https://safe.glif.io'>Safe</SmartLink>
            </Li>
            <Li>
              <SmartLink href='https://explorer.glif.io'>Explorer</SmartLink>
            </Li>
            <Li>
              <SmartLink href='https://verify.glif.io'>Verifier</SmartLink>
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
