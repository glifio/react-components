import styled from 'styled-components'
import PropTypes from 'prop-types'

const LabeledTextEl = styled.div`
  h4 {
    margin: 0;
    color: var(--gray-dark);
  }
  p {
    margin: 0;
  }
`

export const LabeledText = ({
  label,
  text,
  children
}: LabeledTextProps) => (
  <LabeledTextEl>
    {label && <h4>{label}</h4>}
    {text && <p>{text}</p>}
    {children}
  </LabeledTextEl>
)

export interface LabeledTextProps {
  label?: string
  text?: string
  children?: React.ReactNode
}

LabeledText.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
