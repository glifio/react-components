import { FilecoinNumber } from '@glif/filecoin-number'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { Badge } from '../generic'
import { TR, TD } from '../table'
import { AddressLink } from '../../AddressLink'
import { SmartLink } from '../../Link/SmartLink'
import { MsigTransaction } from '../../../generated/graphql'
import { PROPOSAL_ROW_PROP_TYPE } from '../types'
import { getMethodName } from '../methodName'
import appTheme from '../../theme'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

export default function ProposalHistoryRow(props: ProposalHistoryRowProps) {
  const { proposal, idHref, inspectingAddress, actionRequired } = props

  const router = useRouter()
  const proposerIsInspecting = useMemo(
    () =>
      proposal.approved[0].robust === inspectingAddress ||
      proposal.approved[0].id === inspectingAddress,
    [proposal.approved, inspectingAddress]
  )

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
        <SmartLink href={idHref(proposal.id)}>{proposal.id}</SmartLink>
      </TD>
      <TD>
        <Badge color='purple'>
          {getMethodName('/multisig', proposal.method)}
        </Badge>
      </TD>
      <TD>
        <AddressLink
          id={proposal.approved[0].robust ? '' : proposal.approved[0].id}
          address={proposal.approved[0].robust}
          disableLink={proposerIsInspecting}
          hideCopy
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
  inspectingAddress?: string
  actionRequired?: boolean
}

ProposalHistoryRow.propTypes = {
  proposal: PROPOSAL_ROW_PROP_TYPE.isRequired,
  idHref: PropTypes.func.isRequired,
  inspectingAddress: PropTypes.string,
  actionRequired: PropTypes.bool
}

ProposalHistoryRow.defaultProps = {
  inspectingAddress: ''
}
