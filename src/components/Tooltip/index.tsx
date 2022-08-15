import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../theme'

const Icon = styled.button`
  width: 2em;
  height: 2em;
  padding: 0;
  line-height: 2em;
  border-radius: 1em;
  border: 1px solid ${Colors.BLACK};
  color: ${Colors.BLACK};
  background: transparent;
  text-align: center;
  cursor: pointer;
`

const Content = styled.div`
  display: none;
  position: absolute;
  top: calc(100% + 0.5em);
  left: 50%;
  width: max-content;
  max-width: 20em;
  transform: translateX(-50%);
  padding: 0.5em 0.75em;
  color: ${Colors.BLACK};
  background-color: ${Colors.WHITE};
  border-radius: ${props => props.theme.radii[2]};
  box-shadow: ${props => props.theme.shadows[2]};
  z-index: ${props => props.theme.zIndices[1]};
`

const Wrapper = styled.div`
  position: relative;

  &:hover {
    ${Icon} {
      color: ${Colors.PURPLE_MEDIUM};
      border-color: ${Colors.PURPLE_MEDIUM};
    }
    ${Content} {
      display: block;
    }
  }
`

const Tooltip = ({ content }: TooltipProps) => {
  return (
    <Wrapper>
      <Icon>?</Icon>
      <Content>{content}</Content>
    </Wrapper>
  )
}

interface TooltipProps {
  content: string
}

Tooltip.propTypes = {
  content: PropTypes.string.isRequired
}

export default Tooltip
