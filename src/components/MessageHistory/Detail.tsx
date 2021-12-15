import React from 'react'
import PropTypes from 'prop-types'
import { MessageBase, messagePropTypes } from './types'
import Box from '../Box'
import { P } from '../Typography'

export default function MessageDetail(
  props: MessageBase & { parent?: string; child?: string }
) {
  return (
    <Box>
      <P>Message Overview</P>
    </Box>
  )
}

MessageDetail.propTypes = {
  ...messagePropTypes,
  parent: PropTypes.string,
  child: PropTypes.string
}
