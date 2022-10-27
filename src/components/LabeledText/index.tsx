import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../theme'

const LabeledTextEl = styled.div`
  ${({ inline }) => (inline && css`
    display: inline-block;
  `)}

  h4 {
    margin: 0;
    color: ${Colors.GRAY_DARK};
  }

  p {
    margin: 0;
    line-height: 1.5;
  }
`

export const LabeledText = ({
  label,
  text,
  inline,
  children
}: LabeledTextProps) => (
  <LabeledTextEl inline={inline}>
    {label && <h4>{label}</h4>}
    {text && <p>{text}</p>}
    {children}
  </LabeledTextEl>
)

export interface LabeledTextProps {
  label?: string
  text?: string
  inline?: boolean
  children?: React.ReactNode
}

LabeledText.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
  inline: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
