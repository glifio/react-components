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
          <ButtonV2 fontSize='1.5rem' onClick={speedUp}>
            <IconSpeedUp width='1.75rem' />
            Speed up
          </ButtonV2>

          <ButtonV2 fontSize='1.5rem' onClick={cancel}>
            <IconCancel width='1.25rem' />
            Cancel
          </ButtonV2>
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
  accept,
  reject,
  actionRequired
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
        <>
          <ButtonV2 hoverColor='green' small fontSize='1.5rem' onClick={accept}>
            <IconCheck width='1.75rem' />
            Accept
          </ButtonV2>

          <ButtonV2 hoverColor='red' small fontSize='1.5rem' onClick={reject}>
            <IconFail width='1.25rem' />
            Reject
          </ButtonV2>
        </>
      )}
    </Box>
  </Box>
)

type ProposalHeadProps = {
  title: string
  actionRequired: boolean
  accept?: (proposal: MsigTransaction) => void
  reject?: (proposal: MsigTransaction) => void
}

ProposalHead.propTypes = {
  title: PropTypes.string.isRequired,
  actionRequired: PropTypes.bool.isRequired,
  accept: PropTypes.func,
  reject: PropTypes.func
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
export const Parameters = ({ params, depth }: ParametersProps) => (
  <>
    {Object.entries(params).map(([key, value]) => {
      switch (key.toLowerCase()) {
        case 'params':
          return value ? (
            <>
              <Line key={`${depth}-${key}-1`} label='Parameters'></Line>
              <Parameters
                key={`${depth}-${key}-2`}
                params={value}
                depth={depth + 1}
              />
            </>
          ) : (
            <Line key={`${depth}-${key}`} label='Parameters'>
              &mdash;
            </Line>
          )
        case 'method':
          return (
            <Line key={`${depth}-${key}`} label={key} depth={depth}>
              <Badge color='purple'>{value}</Badge>
            </Line>
          )
        case 'value':
          return (
            <Line key={`${depth}-${key}`} label={key} depth={depth}>
              {new FilecoinNumber(value, 'attofil').toFil()} FIL
            </Line>
          )
        default:
          return (
            <Line key={`${depth}-${key}`} label={key} depth={depth}>
              {value}
            </Line>
          )
      }
    })}
  </>
)

type ParametersProps = {
  params: object
  depth: number
}

Parameters.propTypes = {
  params: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired
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
