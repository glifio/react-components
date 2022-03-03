import React, { useEffect, useState } from 'react'
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

export default function PhishingBanner({ href, mt, mb }) {
  const [closed, setClosed] = useState(false)
  useEffect(() => {
    if (!href.includes('glif.io')) {
      logger.error('PHISHING DETECTED')
    }
  }, [href])
  return (
    <>
      {!closed && (
        <PhishingBannerContainer
          style={{ marginTop: mt || 0, marginBottom: mb || 0 }}
        >
          {href.includes('glif.io') && (
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
  href: PropTypes.string.isRequired,
  mt: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  mb: PropTypes.oneOf([PropTypes.string, PropTypes.number])
}
