import React from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import { useRouter } from 'next/router'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { Badge } from '../generic'
import { TR, TD } from '../table'
import { AddressWOptionalLink, SmartLink } from '../../Link/SmartLink'
import { MsigTransaction } from '../../../generated/graphql'
import { PROPOSAL_ROW_PROP_TYPE } from '../types'
import { getMethodName } from '../methodName'
import appTheme from '../../theme'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

export default function ProposalHistoryRow(props: ProposalHistoryRowProps) {
  const { proposal, idHref, addressHref, inspectingAddress, actionRequired } =
    props

  const router = useRouter()

  return (
    <TR
      css={`
        &:hover {
          cursor: pointer;
        }
      `}
      onClick={() => {
        if (props?.idHref(proposal.id).charAt(0) === '/') {
          router.push(idHref(proposal.id))
        } else {
          window.open(idHref(proposal.id), '_blank')
        }
      }}
    >
      <TD>
        <SmartLink href={idHref(proposal.id)}>
          <a
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-block',
              maxWidth: '10rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            target='_blank'
            rel='noopener noreferrer'
          >
            {proposal.id}
          </a>
        </SmartLink>
      </TD>
      <TD>
        <Badge color='purple'>
          {getMethodName('/multisig', proposal.method)}
        </Badge>
      </TD>
      <TD>
        <AddressWOptionalLink
          onClick={e => e.stopPropagation()}
          address={proposal.approved[0].robust || proposal.approved[0].id}
          addressHref={addressHref}
          inspectingAddress={inspectingAddress}
        />
      </TD>
      <TD>{new FilecoinNumber(proposal.value, 'attofil').toFil()} FIL</TD>
      <TD>{proposal.approved?.length}</TD>
      {actionRequired && (
        <TD
          css={`
            color: ${({ theme }: { theme: typeof appTheme }) =>
              theme.colors.core.primary};
          `}
        >
          Action required
        </TD>
      )}
    </TR>
  )
}

type ProposalHistoryRowProps = {
  key: any
  proposal: MsigTransaction
  idHref: (id: number) => string
  addressHref: (address: string) => string
  inspectingAddress?: string
  actionRequired?: boolean
}

ProposalHistoryRow.propTypes = {
  proposal: PROPOSAL_ROW_PROP_TYPE.isRequired,
  idHref: PropTypes.func.isRequired,
  addressHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string,
  actionRequired: PropTypes.bool
}

ProposalHistoryRow.defaultProps = {
  inspectingAddress: ''
}
