import React, { useMemo } from 'react'
import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'
import Link from 'next/link'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import Box from '../../Box'
import { TR, TD } from '../table'
import { AddressWOptionalLink } from '../../Link/SmartLink'
import { MsigTransaction } from '../../../generated/graphql'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

export default function ProposalHistoryRow(props: ProposalHistoryRowProps) {
  const { msigTransaction, cidHref } = props
  return (
    <TR>
      <TD>
        <Link href={cidHref(msigTransaction.id)}>
          <a
            style={{
              display: 'inline-block',
              maxWidth: '10rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {msigTransaction.id}
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
          {'message.methodName.toUpperCase()'}
        </Box>
      </TD>
      <TD>{'message.height'}</TD>
      <TD>
        <AddressWOptionalLink
          address={msigTransaction.from.robust}
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
      <TD>{totalCost}</TD>
    </TR>
  )
}

type ProposalHistoryRowProps = {
  msigTransaction: MsigTransaction
  cidHref: (cid: string) => string
  addressHref: (address: string) => string
  inspectingAddress?: string
}

ProposalHistoryRow.propTypes = {
  message: MESSAGE_CONFIRMED_ROW_PROP_TYPE,
  time: PropTypes.number.isRequired,
  cidHref: PropTypes.func.isRequired,
  addressHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string
}

ProposalHistoryRow.defaultProps = {
  inspectingAddress: ''
}
