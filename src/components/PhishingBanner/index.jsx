import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { P } from '../Typography'
import { baseColors, devices } from '../theme'

const PhishingBannerContainer = styled.div`
  background: ${baseColors.red.base};
  color: white;
  font-size: var(--type-small);
  line-height: 1.4;
  grid-area: banner;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: ${devices.tablet}) {
    padding: 0 20px;
  }

  @media (min-width: ${devices.gt.tablet}) {
    text-align: center;
    padding: 0 20px;
  }
`

const PhishingText = styled(P)`
  display: inline-block;

  > a {
    text-decoration: underline;
    cursor: pointer;
    color: inherit;
  }
`

export default function PhishingBanner({ href, closed, setClosed }) {
  return (
    <>
      {!closed ? (
        <PhishingBannerContainer>
          <div
            css={`
              @media (max-width: ${devices.tablet}) {
                display: flex;
                justify-content: center;
              }
            `}
          >
            <PhishingText style={{ display: 'inline-block' }}>
              For your protection, please check your browser&apos;s URL bar that
              you&apos;re visiting{' '}
              <a href={href} target='_blank' rel='noopener noreferrer'>
                https://wallet.glif.io
              </a>
            </PhishingText>
            <button
              type='button'
              style={{
                marginLeft: '30px',
                display: 'inline-block',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                color: 'white'
              }}
              onClick={() => setClosed(true)}
            >
              close
            </button>
          </div>
        </PhishingBannerContainer>
      ) : null}
    </>
  )
}

PhishingBanner.propTypes = {
  href: PropTypes.string.isRequired,
  closed: PropTypes.bool,
  setClosed: PropTypes.func
}

PhishingBanner.defaultProps = {
  closed: false,
  setClosed: () => {}
}
