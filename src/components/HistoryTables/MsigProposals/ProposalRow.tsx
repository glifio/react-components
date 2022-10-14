import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { FilecoinNumber } from '@glif/filecoin-number'
import { getMethodName } from '@glif/filecoin-actor-utils'

import { AddressLink } from '../../LabeledText/AddressLink'
import { ButtonV2Link } from '../../Button/V2'
import { IconCheck, IconCancel } from '../../Icons'
import { Address, MsigTransaction } from '../../../generated/graphql'
import { isAddrEqual } from '../../../utils/isAddrEqual'
import { isAddressSigner } from '../../../utils/isAddressSigner'
import {
  GRAPHQL_ADDRESS_PROP_TYPE,
  GRAPHQL_MSIG_TRANSACTION_PROPTYPE
} from '../../../customPropTypes'
import { navigate } from '../../../utils/urlParams'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

export default function ProposalHistoryRow({
  proposal,
  walletAddress,
  idHref,
  approveHref,
  cancelHref
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
          navigate(router, { pageUrl: idHref(proposal.id), retainParams: true })
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
          <ButtonV2Link red href={cancelHref(proposal.id)}>
            <IconCancel width='auto' height='1em' />
            Cancel
          </ButtonV2Link>
        ) : (
          canApprove && (
            <ButtonV2Link green href={approveHref(proposal.id)}>
              <IconCheck width='auto' height='1em' />
              Approve
            </ButtonV2Link>
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
  approveHref: (id: number) => string
  cancelHref: (id: number) => string
}

ProposalHistoryRow.propTypes = {
  proposal: GRAPHQL_MSIG_TRANSACTION_PROPTYPE.isRequired,
  walletAddress: GRAPHQL_ADDRESS_PROP_TYPE.isRequired,
  idHref: PropTypes.func.isRequired,
  approveHref: PropTypes.func.isRequired,
  cancelHref: PropTypes.func.isRequired
}
