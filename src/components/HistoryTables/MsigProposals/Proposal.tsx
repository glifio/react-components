import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useCompletedProposal } from './useCompletedProposals'
import Box from '../../Box'
import { P, H2, HR } from '../../Typography'
import ButtonV2 from '../../Button/V2'
import { ADDRESS_PROPTYPE } from '../../../customPropTypes'
import { MsigTransaction } from '../../../generated/graphql'

type ProposalDetailProps = {
  id: number
  address: string
  cid?: string

  accept?: (proposal: MsigTransaction) => void
  reject?: (proposal: MsigTransaction) => void
}

export default function ProposalDetail(props: ProposalDetailProps) {
  const { completedProposal, loading, error } = useCompletedProposal(
    props.id,
    props.address,
    props.cid
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.message}</p>

  return (
    <>
      {props.accept && (
        <ButtonV2 onClick={() => props.accept(completedProposal.proposal)}>
          Accept
        </ButtonV2>
      )}
      {props.reject && (
        <ButtonV2 onClick={() => props.reject(completedProposal.proposal)}>
          Reject
        </ButtonV2>
      )}
    </>
  )
}

ProposalDetail.propTypes = {
  id: PropTypes.number.isRequired,
  address: ADDRESS_PROPTYPE,
  cid: PropTypes.string,
  accept: PropTypes.func,
  reject: PropTypes.func
}

ProposalDetail.defaultProps = {
  cid: ''
}
