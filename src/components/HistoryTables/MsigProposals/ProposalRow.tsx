import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { FilecoinNumber } from '@glif/filecoin-number'
import { getMethodName } from '@glif/filecoin-actor-utils'

import { AddressLink } from '../../LabeledText/AddressLink'
import { ButtonV2 } from '../../Button/V2'
import { IconCheck, IconFail } from '../../Icons'
import { Address, MsigTransaction } from '../../../generated/graphql'
import { isAddrEqual } from '../../../utils/isAddrEqual'
import { isAddressSigner } from '../../../utils/isAddressSigner'
import { GRAPHQL_ADDRESS_PROP_TYPE } from '../../../customPropTypes'
import { PROPOSAL_ROW_PROP_TYPE } from '../types'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

export default function ProposalHistoryRow({
  proposal,
  walletAddress,
  idHref,
  approve,
  cancel
}: ProposalHistoryRowProps) {
  const router = useRouter()

  const isProposer = useMemo<boolean>(
    () => isAddrEqual(proposal.approved[0], walletAddress),
    [proposal.approved, walletAddress]
  )

  const canApprove = useMemo<boolean>(
    () => !isAddressSigner(walletAddress, proposal.approved),
    [proposal.approved, walletAddress]
  )

  return (
    <tr
      className='selectable'
      onClick={() => {
        if (idHref(proposal.id).charAt(0) === '/') {
          router.push(idHref(proposal.id))
        } else {
          window.open(idHref(proposal.id), '_blank')
        }
      }}
    >
      <td>{proposal.id}</td>
      <td>{getMethodName('multisig', proposal.method)}</td>
      <td>
        <AddressLink
          id={proposal.approved[0].id}
          address={proposal.approved[0].robust}
          disableLink={isProposer}
          hideCopy
        />
      </td>
      <td>{new FilecoinNumber(proposal.value, 'attofil').toFil()} FIL</td>
      <td>{proposal.approved?.length}</td>
      <td>
        {isProposer ? (
          <ButtonV2 red onClick={() => cancel(proposal)}>
            <IconFail width='1.25rem' />
            Cancel
          </ButtonV2>
        ) : (
          canApprove && (
            <ButtonV2 green onClick={() => approve(proposal)}>
              <IconCheck width='1.75rem' />
              Approve
            </ButtonV2>
          )
        )}
      </td>
    </tr>
  )
}

type ProposalHistoryRowProps = {
  proposal: MsigTransaction
  walletAddress: Address
  idHref: (id: number) => string
  approve: (proposal: MsigTransaction) => void
  cancel: (proposal: MsigTransaction) => void
}

ProposalHistoryRow.propTypes = {
  proposal: PROPOSAL_ROW_PROP_TYPE.isRequired,
  walletAddress: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  idHref: PropTypes.func.isRequired,
  approve: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}
