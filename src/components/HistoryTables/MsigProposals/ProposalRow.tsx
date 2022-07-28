import { FilecoinNumber } from '@glif/filecoin-number'
import PropTypes from 'prop-types'
import * as dayjs from 'dayjs'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { Badge } from '../generic'
import { AddressLink } from '../../AddressLink'
import { SmartLink } from '../../Link/SmartLink'
import { MsigTransaction } from '../../../generated/graphql'
import { isAddrEqual } from '../../../utils/isAddrEqual'
import { PROPOSAL_ROW_PROP_TYPE } from '../types'
import { getMethodName } from '../methodName'
import appTheme from '../../theme'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

export default function ProposalHistoryRow(props: ProposalHistoryRowProps) {
  const { proposal, idHref, inspectingAddress, actionRequired } = props

  const router = useRouter()
  const proposerIsInspecting = useMemo(
    () => isAddrEqual(proposal.approved[0], inspectingAddress),
    [proposal.approved, inspectingAddress]
  )

  return (
    <tr
      className='selectable'
      onClick={() => {
        if (props?.idHref(proposal.id).charAt(0) === '/') {
          router.push(idHref(proposal.id))
        } else {
          window.open(idHref(proposal.id), '_blank')
        }
      }}
    >
      <td>
        <SmartLink href={idHref(proposal.id)}>{proposal.id}</SmartLink>
      </td>
      <td>
        <Badge
          color='purple'
          text={getMethodName('/multisig', proposal.method)}
        />
      </td>
      <td>
        <AddressLink
          id={proposal.approved[0].id}
          address={proposal.approved[0].robust}
          disableLink={proposerIsInspecting}
          hideCopy
        />
      </td>
      <td>{new FilecoinNumber(proposal.value, 'attofil').toFil()} FIL</td>
      <td>{proposal.approved?.length}</td>
      {actionRequired && (
        <td>
          <SmartLink href={idHref(proposal.id)}>Action required</SmartLink>
        </td>
      )}
    </tr>
  )
}

type ProposalHistoryRowProps = {
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
