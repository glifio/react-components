import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AddressLink } from '../AddressLink'
import { Address } from '../../generated/graphql'
import { ADDRESS_PROPTYPE } from '../../customPropTypes'
import { space } from '../theme'

/**
 * Lines
 */

export const Lines = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space()};

  > p,
  > hr {
    margin: 0.5em 0;
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
  }

  > div:last-child {
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: 0.75em;
    word-break: break-word;
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
 * AddressLine
 */

export const AddressLine = ({ value, label, depth }: AddressLineProps) =>
  typeof value === 'string' ? (
    <Line label={label} depth={depth}>
      <AddressLink address={value} hideCopyText={false} />
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
