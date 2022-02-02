import React from 'react'
import PropTypes from 'prop-types'
import Box from '../Box'

export const Badge = ({ color, children }: BadgeProps) => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='center'
    gridGap='0.75em'
    height='2em'
    lineHeight='2em'
    borderRadius='1em'
    px='1em'
    bg={`${color}.light`}
    color={`${color}.medium`}
    style={{ whiteSpace: 'nowrap' }}
    textAlign='center'
  >
    {children}
  </Box>
)

type BadgeProps = {
  color: 'purple' | 'green' | 'yellow' | 'red'
  children: React.ReactNode
}

Badge.propTypes = {
  color: PropTypes.oneOf(['purple', 'green', 'yellow', 'red']).isRequired,
  children: PropTypes.node.isRequired
}
