import React from 'react'
import PropTypes from 'prop-types'
import { AppTileWrapper } from './AppTileWrapper'
import { fontSize, margin } from '../theme'

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
  soon
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
            <h2
              style={{
                fontSize: fontSize('medium'),
                fontWeight: 'normal',
                margin: 0,
                opacity: soon ? '0.3' : '1'
              }}
            >
              {title}
            </h2>
            {oldTileName && (
              <h3
                style={{
                  fontSize: fontSize('medium'),
                  fontWeight: 'normal',
                  opacity: '1%',
                  textDecoration: 'line-through',
                  lineHeight: 1,
                  margin: 0
                }}
              >
                {oldTileName}
              </h3>
            )}
          </div>
        </AppTitleHeader>

        {soon && (
          <div
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
          </div>
        )}

        <AppTitleImg src={imgSrc} alt='' soon={soon} />
      </AppTitleContent>
      <AppTitleHover>{description}</AppTitleHover>
    </AppTileWrapper>
  )
}

AppTile.defaultProps = {
  oldTileName: ''
}

AppTile.propTypes = {
  description: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  oldTileName: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool,
  soon: PropTypes.bool
}
