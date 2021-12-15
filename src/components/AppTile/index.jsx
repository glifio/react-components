import React from 'react'
import PropTypes from 'prop-types'
import { AppTileWrapper } from './AppTileWrapper'
import { space } from '../theme'

import { H2, H3, P } from '../Typography'
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
            <H2
              style={{
                fontWeight: 'normal',
                margin: 0,
                opacity: soon ? '0.3' : '1',
                textDecoration: 'none'
              }}
            >
              {title}
            </H2>
            {oldTileName && (
              <H3
                style={{
                  fontWeight: 'normal',
                  opacity: '0.3',
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
