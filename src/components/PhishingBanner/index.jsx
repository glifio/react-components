import React, { useMemo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SmartLink } from '../Link/SmartLink'
import { baseColors } from '../theme'
import { logger } from '../../logger'

const PhishingBannerContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1.5em;
  border-radius: 10px;
  font-size: var(--type-small);
  text-align: center;
  background: ${baseColors.red.base};
  color: white;

  p {
    flex: 1 1 auto;
  }

  a {
    color: inherit;
    text-decoration: underline;

    &:hover {
      color: inherit;
      text-decoration: none;
    }
  }

  button {
    height: 3em;
    padding: 0 1.5em;
    cursor: pointer;
    border: none;
    color: inherit;
    background: none;
  }
`

export default function PhishingBanner({ href }) {
  const [closed, setClosed] = useState(false)
  const glifDomain = 'glif.io'
  const hrefDomain = useMemo(
    () => new URL(href).hostname.split('.').slice(-2).join('.'),
    [href]
  )
  const isPhishing = useMemo(
    () => hrefDomain !== glifDomain,
    [hrefDomain, glifDomain]
  )

  useEffect(
    () => isPhishing && logger.error(`PHISHING DETECTED BY ${href}`),
    [isPhishing, href]
  )

  return (
    <>
      {!closed && (
        <PhishingBannerContainer>
          {isPhishing ? (
            <p>
              WARNING: Possible phishing detected! This website is not on the{' '}
              <SmartLink href={`https://${glifDomain}`}>{glifDomain}</SmartLink>{' '}
              domain.
            </p>
          ) : (
            <p>
              For your protection, please check your browser&apos;s URL bar that
              you&apos;re visiting&nbsp;
              <SmartLink href={href}>{href}</SmartLink>
            </p>
          )}
          <button type='button' onClick={() => setClosed(true)}>
            close
          </button>
        </PhishingBannerContainer>
      )}
    </>
  )
}

PhishingBanner.propTypes = {
  href: PropTypes.string.isRequired
}
