import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Colors } from '../theme'
import { IconCopyAccountAddress } from '../Icons'
import copyToClipboard from '../../utils/copyToClipboard'

const CopyTextEl = styled.span`
  position: relative;
  cursor: pointer;

  svg {
    vertical-align: middle;
    transition: transform 0.1s ease-out;
  }

  .copy-text {
    position: absolute;
    top: calc(50% - 0.2em);
    left: calc(100%);
    padding-left: 0.5em;
    color: ${props => props.color};
    opacity: 0;
    transform: translateY(-50%);
    transition: opacity 0.2s ease-in;
    pointer-events: none;
  }

  &:hover {
    svg {
      transform: scale(1.25);
    }
    .copy-text {
      opacity: 1;
      pointer-events: all;
    }
  }
`

export const CopyText = ({
  text,
  color,
  hideCopyText,
  stopPropagation
}: CopyTextProps) => {
  const [copied, setCopied] = useState(false)
  return (
    <CopyTextEl
      color={color}
      role='button'
      onClick={e => {
        stopPropagation && e.stopPropagation()
        copyToClipboard(text)
        setCopied(true)
      }}
    >
      <IconCopyAccountAddress />
      {!hideCopyText && (
        <span className='copy-text'>{copied ? 'Copied' : 'Copy'}</span>
      )}
    </CopyTextEl>
  )
}

type CopyTextProps = {
  text: string
  color?: string
  hideCopyText?: boolean
  stopPropagation?: boolean
}

CopyText.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  hideCopyText: PropTypes.bool,
  stopPropagation: PropTypes.bool
}

CopyText.defaultProps = {
  color: Colors.PURPLE_MEDIUM,
  hideCopyText: false,
  stopPropagation: true
}
