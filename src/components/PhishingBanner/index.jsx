import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { P } from '../Typography'
import { baseColors, devices } from '../theme'

const PhishingBannerContainer = styled.div`
  background: ${baseColors.red.base};
  color: white;
  font-size: var(--type-small);
  line-height: 50px;
  border-radius: 10px;
  overflow: hidden;
  padding: 0 20px;
  height: 50px;

  @media (min-width: ${devices.tablet}) {
    text-align: center;
  }
`

const PhishingText = styled(P)`
  display: inline-block;
  margin: 0;

  > a {
    text-decoration: underline;
    cursor: pointer;
    color: inherit;

    &:hover {
      color: inherit;
      text-decoration: none;
    }
  }
`

const SAFE = 'https://safe.glif.io'
const SENDER = 'https://sender.glif.io'

export default function PhishingBanner({ href, closed, setClosed }) {
  return (
    <>
      {!closed && (
        <PhishingBannerContainer>
          <div
            css={`
              @media (max-width: ${devices.tablet}) {
                display: flex;
                justify-content: center;
              }
            `}
          >
            {(href === SAFE || href === SENDER) && (
              <PhishingText style={{ display: 'inline-block' }}>
                For your protection, please check your browser&apos;s URL bar that
                you&apos;re visiting{' '}
                <a href={href} target='_blank' rel='noopener noreferrer'>
                  {href}
                </a>
              </PhishingText>
            )}
            <button
              type='button'
              style={{
                marginLeft: '30px',
                display: 'inline-block',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                color: 'white',
                height: '50px'
              }}
              onClick={() => setClosed(true)}
            >
              close
            </button>
          </div>
        </PhishingBannerContainer>
      )}
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
