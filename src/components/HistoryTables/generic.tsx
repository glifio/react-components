import React from 'react'
import PropTypes from 'prop-types'
import Box from '../Box'

export const Badge = ({ color, text, uppercase, icon }: BadgeProps) => (
  <Box
    display='inline-flex'
    alignItems='center'
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
    {icon}
    <span>{uppercase ? text.toUpperCase() : text}</span>
  </Box>
)

type BadgeProps = {
  color: 'purple' | 'green' | 'yellow' | 'red' | 'gray'
  text: string
  uppercase?: boolean
  icon?: JSX.Element
}

Badge.propTypes = {
  color: PropTypes.oneOf(['purple', 'green', 'yellow', 'red', 'gray']),
  text: PropTypes.string.isRequired,
  uppercase: PropTypes.bool,
  icon: PropTypes.node
}

Badge.defaultProps = {
  color: 'gray',
  uppercase: true
}
