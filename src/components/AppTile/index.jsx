import React from 'react'
import PropTypes from 'prop-types'
import { AppTileWrapper } from './AppTileWrapper'
import { margin } from '../theme'

import { H2, H3, P } from '../Typography'
import {
  AppTitleContent,
  AppTitleHeader,
  AppTitleHover,
  AppTitleImg
} from './AppTileContent'

export function AppTile({
  description,
  oldTileName,
  imgSrc,
  href,
  title,
  small,
  large,
  soon,
  beta
}) {
  return (
    <AppTileWrapper
      href={href}
      target='_blank'
      rel='noreferrer'
      small={small}
      large={large}
      soon={soon}
    >
      <AppTitleContent small={small} large={large} soon={soon}>
        <AppTitleHeader soon={soon} style={{ justifyContent: 'flex-end' }}>
          <div style={{ textAlign: 'right' }}>
            <H2
              style={{
                fontWeight: 'normal',
                margin: 0,
                opacity: soon ? '0.3' : '1'
              }}
            >
              {title}
            </H2>
            {oldTileName && (
              <H3
                style={{
                  fontWeight: 'normal',
                  opacity: '0.5',
                  textDecoration: 'line-through',
                  lineHeight: 1,
                  margin: 0
                }}
              >
                {oldTileName}
              </H3>
            )}
            {beta && (
              <H3
                style={{
                  fontWeight: 'normal',
                  opacity: '0.5',
                  lineHeight: 1,
                  margin: 0
                }}
              >
                Beta
              </H3>
            )}
          </div>
        </AppTitleHeader>

        {soon && (
          <P
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              color: '#fff',
              zIndex: '2',
              padding: margin(),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: '.5'
            }}
          >
            (Soon)
          </P>
        )}

        <AppTitleImg src={imgSrc} alt='' soon={soon} />
      </AppTitleContent>
      <AppTitleHover large={large}>{description}</AppTitleHover>
    </AppTileWrapper>
  )
}

AppTile.defaultProps = {
  oldTileName: '',
  small: true
}

AppTile.propTypes = {
  description: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  oldTileName: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool,
  soon: PropTypes.bool,
  beta: PropTypes.bool
}
