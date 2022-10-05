import styled from 'styled-components'
import PropTypes from 'prop-types'

import { LabeledText } from '.'
import { SmartLink } from '../SmartLink'
import { CopyText } from '../CopyText'
import { IconNewTab } from '../Icons'
import { Colors } from '../theme'

const LabeledLinkEl = styled.div`
  display: flex;
  gap: 0.25em;
  line-height: 1.5;

  > a {
    color: ${props => props.color};
    text-decoration: none;

    &:hover {
      color: ${props => props.color};
      text-decoration: underline;
    }

    svg {
      transition: 0.24s ease-in-out;
      vertical-align: middle;

      &:hover {
        transform: scale(1.25);
        fill: ${Colors.PURPLE_MEDIUM};
      }
    }
  }
`

export const LabeledLink = ({
  label,
  color,
  href,
  linkText,
  copyText,
  disableLink,
  hideCopy,
  hideCopyText,
  useNewTabIcon
}: LabeledLinkProps) => {
  return (
    <LabeledText label={label}>
      <LabeledLinkEl color={color}>
        {disableLink || useNewTabIcon ? (
          <span>{linkText}</span>
        ) : (
          <SmartLink href={href}>{linkText}</SmartLink>
        )}
        {useNewTabIcon && (
          <SmartLink href={href}>
            <IconNewTab />
          </SmartLink>
        )}
        {!hideCopy && copyText && (
          <CopyText text={copyText} hideCopyText={hideCopyText} color={color} />
        )}
      </LabeledLinkEl>
    </LabeledText>
  )
}

export interface LabeledLinkProps {
  label?: string
  color?: string
  href: string
  linkText?: string
  copyText?: string
  disableLink?: boolean
  hideCopy?: boolean
  hideCopyText?: boolean
  useNewTabIcon?: boolean
}

export const LabeledLinkPropTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  href: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  copyText: PropTypes.string,
  disableLink: PropTypes.bool,
  hideCopy: PropTypes.bool,
  hideCopyText: PropTypes.bool,
  useNewTabIcon: PropTypes.bool
}

LabeledLink.propTypes = LabeledLinkPropTypes
LabeledLink.defaultProps = {
  color: Colors.PURPLE_MEDIUM,
  disableLink: false,
  hideCopy: false,
  hideCopyText: true,
  useNewTabIcon: false
}
