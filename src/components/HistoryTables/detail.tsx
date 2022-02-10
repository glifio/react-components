import React, { useMemo } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'
import PropTypes from 'prop-types'
import { H2 } from '../Typography'
import { MsigTransaction } from '../../generated/graphql'
import Box from '../Box'
import ButtonV2 from '../Button/V2'
import { Badge } from './generic'
import {
  IconSpeedUp,
  IconCancel,
  IconCheck,
  IconPending,
  IconFail
} from '../Icons'
import { PROPOSAL_ROW_PROP_TYPE } from './types'
import { getMethodName } from './methodName'

/**
 * Head
 * Top row of the detail page, displaying
 * the title and Speed up / Cancel buttons
 */
export const Head = ({ title, speedUp, cancel, pending }: HeadProps) => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='space-between'
    gridGap='1em'
    my='1em'
  >
    <H2 color='core.primary' fontSize='1.5rem' margin='0'>
      {title}
    </H2>
    <Box display='flex' gridGap='1rem'>
      {pending && (
        <>
          {speedUp && (
            <ButtonV2 green onClick={speedUp}>
              <IconSpeedUp width='1.25rem' />
              Speed up
            </ButtonV2>
          )}

          {cancel && (
            <ButtonV2 red onClick={cancel}>
              <IconCancel width='0.8rem' />
              Cancel
            </ButtonV2>
          )}
        </>
      )}
    </Box>
  </Box>
)

type HeadProps = {
  title: string
  pending: boolean
  speedUp?: () => void
  cancel?: () => void
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  pending: PropTypes.bool.isRequired,
  speedUp: PropTypes.func,
  cancel: PropTypes.func
}

Head.defaultProps = {
  pending: false
}

export const ProposalHead = ({
  title,
  proposal,
  accept,
  cancel,
  actionRequired,
  approvalsUntilExecution,
  isProposer
}: ProposalHeadProps) => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='space-between'
    gridGap='1em'
    my='1em'
  >
    <H2 color='core.primary' fontSize='1.5rem' margin='0'>
      {title}
    </H2>
    {actionRequired && (
      <H2 color='core.primary' fontSize='1.5rem' margin='0'>
        Action Required
      </H2>
    )}
    <Box display='flex' gridGap='1rem'>
      {actionRequired && (
        <ButtonV2
          green
          onClick={() => accept(proposal, approvalsUntilExecution)}
        >
          <IconCheck width='1.75rem' />
          Approve
        </ButtonV2>
      )}
      {isProposer && (
        <ButtonV2 red onClick={() => cancel(proposal, approvalsUntilExecution)}>
          <IconFail width='1.25rem' />
          Cancel
        </ButtonV2>
      )}
    </Box>
  </Box>
)

type ProposalHeadProps = {
  title: string
  actionRequired: boolean
  isProposer: boolean
  proposal: MsigTransaction
  approvalsUntilExecution: number
  accept?: (proposal: MsigTransaction, approvalsUntilExecution: number) => void
  cancel?: (proposal: MsigTransaction, approvalsUntilExecution: number) => void
}

ProposalHead.propTypes = {
  title: PropTypes.string.isRequired,
  actionRequired: PropTypes.bool.isRequired,
  isProposer: PropTypes.bool.isRequired,
  proposal: PROPOSAL_ROW_PROP_TYPE.isRequired,
  approvalsUntilExecution: PropTypes.number.isRequired,
  accept: PropTypes.func,
  cancel: PropTypes.func
}

ProposalHead.defaultProps = {
  actionRequired: false
}

/**
 * Line
 * Content row of the detail page
 */
export const Line = ({ label, depth, children }: LineProps) => (
  <Box
    display='flex'
    alignItems='center'
    gridGap='1em'
    lineHeight='2em'
    my='1em'
    pl={`${depth * 5}%`}
    css={`
      a {
        color: ${props => props.theme.colors.core.primary};
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      .gray {
        color: ${props => props.theme.colors.gray.medium};
      }
    `}
  >
    <Box minWidth='200px' flex='0 1 25%'>
      {label}
    </Box>
    <Box flex='1 1' display='flex' alignItems='center' gridGap='0.75em'>
      {children}
    </Box>
  </Box>
)

type LineProps = {
  label?: string
  depth?: number
  children?: React.ReactNode
}

Line.propTypes = {
  label: PropTypes.string,
  depth: PropTypes.number,
  children: PropTypes.node
}

Line.defaultProps = {
  label: '',
  depth: 0,
  children: <></>
}

/**
 * Parameters
 * Parameter rows of the detail page
 */
export const Parameters = ({ params, depth, actorName }: ParametersProps) => (
  <>
    {Object.entries(params).map(([key, value]) => {
      switch (key.toLowerCase()) {
        case 'method':
          return (
            <Line key={`${depth}-${key}`} label={key} depth={depth}>
              <Badge color='purple'>
                {getMethodName(actorName, value as number)}
              </Badge>
            </Line>
          )
        case 'value':
          return (
            <Line key={`${depth}-${key}`} label={key} depth={depth}>
              {new FilecoinNumber(value, 'attofil').toFil()} FIL
            </Line>
          )
        default:
          if (value && typeof value === 'object')
            return (
              <div key={`${depth}-${key}`}>
                <Line
                  label={key === 'params' ? 'Parameters' : key}
                  depth={depth}
                ></Line>
                <Parameters
                  params={value}
                  depth={depth + 1}
                  actorName={actorName}
                />
              </div>
            )
          return (
            <Line key={`${depth}-${key}`} label={key} depth={depth}>
              {value ?? '—'}
            </Line>
          )
      }
    })}
  </>
)

type ParametersProps = {
  params: object
  depth: number
  actorName: string
}

Parameters.propTypes = {
  params: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired,
  actorName: PropTypes.string.isRequired
}

/**
 * Status
 * Badge displaying the current status of the message
 */
export const Status = ({ exitCode, pending }: StatusProps) => {
  const success = useMemo(() => exitCode === 0, [exitCode])
  const color = useMemo(() => {
    if (pending) return 'yellow'
    if (success) return 'green'
    return 'red'
  }, [success, pending])

  const statusText = useMemo(() => {
    if (pending) return 'PENDING'
    if (success) return 'SUCCESS'
    return 'ERROR'
  }, [success, pending])
  return (
    <Badge color={color}>
      {success && <IconCheck width='1.1875rem' />}
      {pending && <IconPending />}
      {statusText}
    </Badge>
  )
}

type StatusProps = {
  exitCode?: number
  pending: boolean
}

Status.propTypes = {
  exitCode: PropTypes.number
}

/**
 * Confirmations
 * Badge displaying the current confirmations of the message
 */
export const Confirmations = ({ count, total }: ConfirmationsProps) => {
  const confirmed = useMemo(() => count >= total, [count, total])
  return (
    <Badge color={confirmed ? 'green' : 'yellow'}>
      {confirmed && <IconCheck width='1.1875rem' />}
      {Math.min(count, total)} / {total} Confirmations
    </Badge>
  )
}

type ConfirmationsProps = {
  count: number
  total: number
}

Confirmations.propTypes = {
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}
