import React from 'react'
import PropTypes from 'prop-types'
import { AppTileWrapper } from './AppTileWrapper'
import { space, fontSize } from '../theme'

import { P } from '../Typography'
import {
  AppTitleContent,
  AppTitleHeader,
  AppTitleDescription,
  AppTitleImg
} from './AppTileContent'

export function AppTile({
  description,
  oldTileName,
  imgSrc,
  imgSrcHover,
  href,
  title,
  small,
  large,
  soon,
  beta
}) {
  return (
    <AppTileWrapper
      data-testid='app-tile-wrapper'
      href={href}
      target='_blank'
      rel='noreferrer'
      small={small}
      large={large}
      soon={soon}
    >
      <AppTitleContent small={small} large={large} soon={soon}>
        <AppTitleHeader soon={soon}>
          <div>
            <h2
              style={{
                fontSize: fontSize('medium'),
                margin: 0,
                opacity: soon ? '0.3' : '1',
                textDecoration: 'none'
              }}
            >
              {title}
            </h2>
            {oldTileName && (
              <h3
                style={{
                  fontSize: fontSize('medium'),
                  opacity: '0.3',
                  textDecoration: 'line-through',
                  lineHeight: 1,
                  margin: 0
                }}
              >
                {oldTileName}
              </h3>
            )}
            {beta && (
              <h3
                style={{
                  fontSize: fontSize('medium'),
                  opacity: '0.5',
                  lineHeight: 1,
                  margin: 0
                }}
              >
                Beta
              </h3>
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
              padding: space(),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: '.5'
            }}
          >
            (Soon)
          </P>
        )}

        {small && (
          <AppTitleImg className='default' src={imgSrc} alt='' soon={soon} />
        )}

        <AppTitleImg
          className='hover'
          src={imgSrcHover}
          alt=''
          soon={soon}
          title={title}
          large={large}
        />
      </AppTitleContent>
      <AppTitleDescription large={large} small={small}>
        {description}
      </AppTitleDescription>
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
  href: PropTypes.string,
  title: PropTypes.string.isRequired,
  oldTileName: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool,
  soon: PropTypes.bool,
  beta: PropTypes.bool
}
