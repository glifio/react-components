import styled from 'styled-components'
import { bool, func, oneOf } from 'prop-types'
import { Network } from '@glif/filecoin-address'
import { border, typography, layout, flexbox, space } from 'styled-system'
import Box from '../Box'

const NetworkSwitcherButton = styled.button.attrs(() => ({
  display: 'flex',
  flexShrink: '0',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  height: 7,
  paddingLeft: 4,
  paddingRight: 4,
  paddingTop: 1,
  paddingBottom: 1,
  fontSize: 2,
  fontWeight: 1,
  fontFamily: 'RT-Alias-Grotesk',
  border: 0
}))`
  background: ${props => {
    if (props.disabled) return props.theme.colors.status.inactive
    if (props.connected && props.active)
      return props.theme.colors.status.success.background
    if (props.error) return props.theme.colors.status.error.background
    return props.theme.colors.background.text
  }};

  transition: 0.2s ease-in-out;

  &:hover {
    ${props => !props.disabled && 'transform:translateY(-4px);'}
    ${props => !props.disabled && 'cursor: pointer;'}
    ${props =>
      !props.disabled &&
      'background: props.theme.colors.input.background.valid'}
  }
  outline: none;
  ${border}
  ${typography}
  ${layout}
  ${flexbox}
  ${space}
`

const NetworkSwitcherGlyph = ({ onNetworkSwitch, network, ...props }) => {
  return (
    <Box display='flex' justifyContent='flex-start' mt={4} {...props}>
      <NetworkSwitcherButton
        active={network === Network.TEST}
        onClick={() => onNetworkSwitch(Network.TEST)}
        borderTopLeftRadius={2}
        borderBottomLeftRadius={2}
      >
        Use t addresses
      </NetworkSwitcherButton>
      <NetworkSwitcherButton
        active={network === Network.MAIN}
        onClick={() => onNetworkSwitch(Network.MAIN)}
        borderTopRightRadius={2}
        borderBottomRightRadius={2}
      >
        Use f addresses
      </NetworkSwitcherButton>
    </Box>
  )
}

NetworkSwitcherGlyph.propTypes = {
  onNetworkSwitch: func,
  network: oneOf([Network.TEST, Network.MAIN])
}

NetworkSwitcherButton.propTypes = {
  active: bool,
  connected: bool,
  onClick: func.isRequired
}

NetworkSwitcherButton.defaultProps = {
  connected: true,
  active: false
}

export default NetworkSwitcherGlyph
