import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../theme'
import { ShadowBox } from '../Layout'

const TooltipEl = styled.span`
  position: relative;

  .icon {
    cursor: help;
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    line-height: 1.5em;
    text-align: center;
    border: 1px solid ${Colors.BLACK};
    border-radius: 50%;
    transition: color 0.1s ease-out, border-color 0.1s ease-out;
  }

  .content {
    z-index: 1;
    position: absolute;
    top: calc(100% + 0.5em);
    left: 50%;
    width: max-content;
    max-width: 20em;
    transform: translateX(-50%);
    padding: 0.75em 1em;
    opacity: 0;
    transition: opacity 0.2s ease-in;
    pointer-events: none;
  }

  &:hover {
    .icon {
      color: ${Colors.PURPLE_MEDIUM};
      border-color: ${Colors.PURPLE_MEDIUM};
    }
    .content {
      opacity: 1;
    }
  }
`

export const Tooltip = ({ content }: TooltipProps) => {
  return (
    <TooltipEl>
      <span className='icon'>?</span>
      <ShadowBox className='content'>{content}</ShadowBox>
    </TooltipEl>
  )
}

interface TooltipProps {
  content: string
}

Tooltip.propTypes = {
  content: PropTypes.string.isRequired
}
