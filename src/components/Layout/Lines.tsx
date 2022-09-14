import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { FilecoinNumber } from '@glif/filecoin-number'

import { Address } from '../../generated/graphql'
import { AddressLink } from '../LabeledText/AddressLink'
import { makeFriendlyBalance } from '../../utils/makeFriendlyBalance'
import {
  ADDRESS_PROPTYPE,
  FILECOIN_NUMBER_PROPTYPE
} from '../../customPropTypes'
import { Badge } from './Badge'
import { getMethodName } from '@glif/filecoin-actor-utils'

/**
 * Lines
 */

export const Lines = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-m);

  > p,
  > hr {
    margin: 0.5em 0;
  }

  > p[role='button'] {
    margin: 0;
  }
`

/**
 * Line
 */

const LineEl = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  line-height: 2.5em;
  text-align: left;
  padding-left: ${props => `${props.depth * 1.5}em`};

  > div:first-child {
    flex: 0 1 25%;
    min-width: 200px;
    text-transform: capitalize;
  }

  > div:last-child {
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: 0.75em;
    word-break: break-word;

    > p[role='button'] {
      margin: 0;
    }
  }
`

export const Line = ({ label, depth, children }: LineProps) => (
  <LineEl depth={depth}>
    <div>{label}</div>
    <div>{children}</div>
  </LineEl>
)

type LineProps = {
  label?: string
  depth?: number
  children?: React.ReactNode
}

const LinePropTypes = {
  label: PropTypes.string,
  depth: PropTypes.number,
  children: PropTypes.node
}

Line.propTypes = LinePropTypes
Line.defaultProps = {
  label: '',
  depth: 0,
  children: <></>
}

/**
 * CollapsableLines
 */

export const CollapsableLines = ({
  label,
  depth,
  children,
  toggleName
}: CollapsableLinesProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const toggleText = useMemo<string>(() => {
    const prefix = collapsed ? 'show' : 'hide'
    const arrow = collapsed ? '↓' : '↑'
    const name = toggleName || label.toLowerCase()
    return `Click to ${prefix} ${name} ${arrow}`
  }, [label, toggleName, collapsed])

  return (
    <>
      <Line label={label} depth={depth}>
        <p role='button' onClick={() => setCollapsed(!collapsed)}>
          {toggleText}
        </p>
      </Line>
      {!collapsed && children}
    </>
  )
}

interface CollapsableLinesProps {
  label: string
  depth?: number
  children?: React.ReactNode
  toggleName?: string
}

CollapsableLines.propTypes = {
  label: PropTypes.string.isRequired,
  depth: PropTypes.number,
  children: PropTypes.node,
  toggleName: PropTypes.string
}

/**
 * NullishLine
 */

export const NullishLine = ({ label, depth }: NullishLineProps) => (
  <Line label={label} depth={depth}>
    &ndash;
  </Line>
)

interface NullishLineProps {
  label?: string
  depth?: number
}

NullishLine.propTypes = {
  label: PropTypes.string,
  depth: PropTypes.number
}

/**
 * FilecoinLine
 */

export const FilecoinLine = ({ label, depth, value }: FilecoinLineProps) => (
  <Line label={label} depth={depth}>
    {(makeFriendlyBalance(value, 6))} FIL
  </Line>
)

type FilecoinLineProps = {
  value: FilecoinNumber
} & LineProps

FilecoinLine.propTypes = {
  value: FILECOIN_NUMBER_PROPTYPE.isRequired,
  ...LinePropTypes
}

/**
 * MethodLine
 */

export const MethodLine = ({
  label,
  depth,
  actorName,
  methodNum
}: MethodLineProps) => (
  <Line label={label} depth={depth}>
    <Badge
      color='purple'
      text={getMethodName(actorName, methodNum) || `Method ${methodNum}`}
      uppercase={false}
    />
  </Line>
)

type MethodLineProps = {
  actorName: string
  methodNum: number
} & LineProps

MethodLine.propTypes = {
  actorName: PropTypes.string.isRequired,
  methodNum: PropTypes.number.isRequired,
  ...LinePropTypes
}

/**
 * AddressLine
 */

export const AddressLine = ({ value, label, depth }: AddressLineProps) =>
  typeof value === 'string' ? (
    <Line label={label} depth={depth}>
      <AddressLink address={value} fetchAddress hideCopyText={false} />
    </Line>
  ) : (
    <Line label={label} depth={depth}>
      <AddressLink id={value.id} address={value.robust} hideCopyText={false} />
    </Line>
  )

type AddressLineProps = {
  value: string | Address
} & LineProps

AddressLine.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, ADDRESS_PROPTYPE]).isRequired,
  ...LinePropTypes
}
