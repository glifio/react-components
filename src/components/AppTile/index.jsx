import React from 'react'
import PropTypes from 'prop-types'
import { AppTileWrapper } from './AppTileWrapper'
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
            <h2 style={{ fontSize: 'inherit' }}>{title}</h2>
            {oldTileName && (
              <h3
                style={{
                  fontSize: 'inherit',
                  opacity: '1%',
                  textDecoration: 'line-through',
                  lineHeight: 1
                }}
              >
                {oldTileName}
              </h3>
            )}
          </div>
        </AppTitleHeader>
        <AppTitleImg src={imgSrc} alt='' />
      </AppTitleContent>
      <AppTitleHover className='appTileHover'>{description}</AppTitleHover>
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
