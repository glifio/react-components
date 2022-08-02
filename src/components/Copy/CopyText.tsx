import { useState } from 'react'
import styled from 'styled-components'
import { color, margin, space } from 'styled-system'
import { bool, string } from 'prop-types'
import Box from '../Box'
import { IconCopyAccountAddress } from '../Icons'
import copyToClipboard from '../../utils/copyToClipboard'

export const Copy = styled.button`
  /* !important is declared here to override BaseButton's opacity:0.8 on hover. The only instance of us using this declaration. */
  height: auto;
  cursor: pointer;
  opacity: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  padding: 0;
  outline: none;
`

export const StyledIconCopyAccountAddress = styled(IconCopyAccountAddress)`
  transition: 0.24s ease-in-out;
  ${Copy}:hover & {
    transform: scale(1.25);
  }
`

export const LabelCopy = styled.span`
  transition: 0.18s ease-in;
  opacity: 0;
  ${Copy}:hover & {
    opacity: 1;
  }
  text-align: left;
  ${color}
  ${margin}
  ${space}
`

export const CopyText = ({
  text,
  hideCopyText,
  stopPropagation,
  ...props
}: CopyTextProps) => {
  const [copied, setCopied] = useState(false)
  return (
    <Box display='flex' alignItems='center' {...props}>
      <Copy
        display='flex'
        alignItems='center'
        ml={2}
        type='button'
        role='button'
        onClick={e => {
          stopPropagation && e.stopPropagation()
          setCopied(true)
          copyToClipboard(text)
        }}
      >
        <StyledIconCopyAccountAddress />
        {!hideCopyText && (
          <LabelCopy mt={0} ml={1} minWith={7} color={props.color}>
            {copied ? 'Copied' : 'Copy'}
          </LabelCopy>
        )}
      </Copy>
    </Box>
  )
}

type CopyTextProps = {
  text: string
  color?: string
  hideCopyText?: boolean
  stopPropagation?: boolean
  [x: string]: any
}

CopyText.propTypes = {
  text: string.isRequired,
  color: string,
  hideCopyText: bool,
  stopPropagation: bool
}

CopyText.defaultProps = {
  color: 'core.secondary',
  hideCopyText: false,
  stopPropagation: false
}
