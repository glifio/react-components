import React from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import Link from 'next/link'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import Box from '../../Box'
import { TR, TD } from '../table'
import { AddressWOptionalLink } from '../../Link/SmartLink'
import { MessagePendingRow, MESSAGE_PENDING_ROW_PROP_TYPE } from '../types'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

export default function PendingMessageHistoryRow(
  props: PendingMessageHistoryRowProps
) {
  const { message, cidHref, addressHref, inspectingAddress } = props

  return (
    <TR>
      <TD>
        <Link href={cidHref(message.cid)}>
          <a
            style={{
              display: 'inline-block',
              maxWidth: '10rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {message.cid.slice()}
          </a>
        </Link>
      </TD>
      <TD>
        <Box
          height='2em'
          lineHeight='2em'
          borderRadius='1em'
          px='1.5em'
          bg='core.secondary'
        >
          {message.method.toString()}
        </Box>
      </TD>
      <TD>(Pending)</TD>
      <TD>(Pending)</TD>
      <TD>
        <AddressWOptionalLink
          address={message.from.robust}
          addressHref={addressHref}
          inspectingAddress={inspectingAddress}
        />
      </TD>
      <TD>
        <AddressWOptionalLink
          address={message.to.robust}
          addressHref={addressHref}
          inspectingAddress={inspectingAddress}
        />
      </TD>
      <TD>{new FilecoinNumber(message.value, 'attofil').toFil()} FIL</TD>
      <TD>(Pending)</TD>
    </TR>
  )
}

type PendingMessageHistoryRowProps = {
  message: MessagePendingRow
  cidHref: (cid: string) => string
  addressHref: (address: string) => string
  inspectingAddress: string
}

PendingMessageHistoryRow.propTypes = {
  message: MESSAGE_PENDING_ROW_PROP_TYPE.isRequired,
  cidHref: PropTypes.func.isRequired,
  addressHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string
}

PendingMessageHistoryRow.defaultProps = {
  inspectingAddress: ''
}
