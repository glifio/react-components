import React, { useMemo } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import { useRouter } from 'next/router'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import Box from '../../Box'
import { TR, TD } from '../table'
import { AddressWOptionalLink, SmartLink } from '../../Link/SmartLink'
import { MessageConfirmed, MsigTransaction } from '../../../generated/graphql'
import {
  MESSAGE_CONFIRMED_ROW_PROP_TYPE,
  PROPOSAL_ROW_PROP_TYPE
} from '../types'
import { getMethodName } from '../methodName'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

export default function ProposalHistoryRow(props: ProposalHistoryRowProps) {
  const {
    proposal,
    messageConfirmed,
    idHref,
    time,
    addressHref,
    inspectingAddress
  } = props

  const age = useMemo(
    () =>
      messageConfirmed.block.Timestamp
        ? dayjs.unix(messageConfirmed.block.Timestamp).from(time)
        : '',
    [messageConfirmed.block.Timestamp, time]
  )

  const router = useRouter()

  return (
    <TR
      css={`
        &:hover {
          cursor: pointer;
        }
      `}
      onClick={() => {
        if (
          props?.idHref(proposal.id, messageConfirmed.cid).charAt(0) === '/'
        ) {
          router.push(idHref(proposal.id, messageConfirmed.cid))
        } else {
          window.open(idHref(proposal.id, messageConfirmed.cid), '_blank')
        }
      }}
    >
      <TD>
        <SmartLink href={idHref(proposal.id, messageConfirmed.cid)}>
          <a
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-block',
              maxWidth: '10rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {proposal.id}
          </a>
        </SmartLink>
      </TD>
      <TD>
        <Box
          height='2em'
          lineHeight='2em'
          borderRadius='1em'
          px='1.5em'
          bg='core.secondary'
        >
          {getMethodName('/multisig', proposal.method)}
        </Box>
      </TD>
      <TD>{age}</TD>
      <TD>
        <AddressWOptionalLink
          onClick={e => e.stopPropagation()}
          address={messageConfirmed.from.robust}
          addressHref={addressHref}
          inspectingAddress={inspectingAddress}
        />
      </TD>
      <TD>{new FilecoinNumber(proposal.value, 'attofil').toFil()} FIL</TD>
      <TD>{proposal.approved?.length}</TD>
    </TR>
  )
}

type ProposalHistoryRowProps = {
  key: any
  proposal: MsigTransaction
  messageConfirmed: MessageConfirmed
  idHref: (id: number, cid: string) => string
  addressHref: (address: string) => string
  inspectingAddress?: string
  time: number
}

ProposalHistoryRow.propTypes = {
  messageConfirmed: MESSAGE_CONFIRMED_ROW_PROP_TYPE.isRequired,
  proposal: PROPOSAL_ROW_PROP_TYPE.isRequired,
  time: PropTypes.number.isRequired,
  idHref: PropTypes.func.isRequired,
  addressHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string
}

ProposalHistoryRow.defaultProps = {
  inspectingAddress: ''
}
