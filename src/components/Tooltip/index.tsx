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
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0.7px 2.2px -8px,
    rgba(0, 0, 0, 0.04) 0px 1.7px 2.4px, rgba(0, 0, 0, 0.106) 0px 3.1px 8.1px,
    rgba(0, 0, 0, 0.04) 0px 5.6px 12.1px, rgba(0, 0, 0, 0.045) 0px 4.4px 4.8px,
    rgba(0, 0, 0, 0.05) 0px 15px 41px;
  z-index: 9;
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
