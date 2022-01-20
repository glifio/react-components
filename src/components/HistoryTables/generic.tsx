import React from 'react'
import PropTypes from 'prop-types'
import Box from '../Box'

export const Badge = ({ color, children }: BadgeProps) => (
  <Box
    height='2em'
    lineHeight='2em'
    borderRadius='1em'
    px='1.5em'
    bg={`${color}.light`}
    color={`${color}.medium`}
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
