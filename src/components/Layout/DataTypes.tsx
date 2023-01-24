import PropTypes from 'prop-types'
import { DataType, DataTypeMap, Type } from '@glif/filecoin-actor-utils'
import { FilecoinNumber } from '@glif/filecoin-number'

import { Line, NullishLine } from './Lines'
import { AddressLink } from '../LabeledText/AddressLink'
import { makeFriendlyBalance } from '../../utils/makeFriendlyBalance'

/**
 * DataTypeLines
 * Renders a DataType on multiple lines (depending on the contents)
 */

export const DataTypeLines = ({
  label,
  depth,
  dataType
}: DataTypeLinesProps) => {
  switch (dataType.Type) {
    case Type.Bool:
    case Type.String:
    case Type.Number:
    case Type.Bytes:
      return <DataTypeLine label={label} depth={depth} dataType={dataType} />

    case Type.Array:
      return (
        <>
          {dataType.Values.map((value, i) => (
            <DataTypeLines
              key={i}
              label={`${label}[${i}]`}
              depth={depth}
              dataType={value}
            />
          ))}
        </>
      )

    case Type.Object:
      const { Name, Children } = dataType

      if (Name === 'Cid') {
        const cid = Children['/'].Value as string
        return (
          <DataTypeLine
            label={`${label} (CID)`}
            depth={depth}
            dataType={{ Name, Type: Type.String, Value: cid }}
          />
        )
      }

      return (
        <DataTypeMapLines label={label} depth={depth} dataTypeMap={Children} />
      )

    default:
      throw new Error(`Unexpected DataType: ${JSON.stringify(dataType)}`)
  }
}

interface DataTypeLinesProps {
  label?: string
  depth?: number
  dataType: DataType
}

DataTypeLines.propTypes = {
  label: PropTypes.string,
  depth: PropTypes.number,
  dataType: PropTypes.object.isRequired
}

/**
 * DataTypeMapLines
 * Renders a DataTypeMap on multiple lines
 */

export const DataTypeMapLines = ({
  label,
  depth,
  dataTypeMap
}: DataTypeMapLinesProps) => (
  <>
    {label && <Line label={label} depth={depth} />}
    {Object.entries(dataTypeMap).map(([key, dt]) => (
      <DataTypeLines
        key={key}
        label={key}
        depth={label ? (depth ?? 0) + 1 : depth}
        dataType={dt as DataType}
      />
    ))}
  </>
)

interface DataTypeMapLinesProps {
  label?: string
  depth?: number
  dataTypeMap: DataTypeMap
}

DataTypeMapLines.propTypes = {
  label: PropTypes.string,
  depth: PropTypes.number,
  dataTypeMap: PropTypes.object.isRequired
}

/**
 * DataTypeLine
 * Renders the value of a DataType on a single line
 */

export const DataTypeLine = ({ label, depth, dataType }: DataTypeLineProps) => (
  <Line label={label} depth={depth}>
    <DataTypeValue dataType={dataType} label={label} />
  </Line>
)

interface DataTypeLineProps {
  label?: string
  depth?: number
  dataType: DataType
}

DataTypeLine.propTypes = {
  label: PropTypes.string,
  depth: PropTypes.number,
  dataType: PropTypes.object.isRequired
}

/**
 * DataTypeValue
 * Renders the value of a DataType using the most suitable component.
 */

export const DataTypeValue = ({ dataType, label }: DataTypeValueProps) => {
  const { Name, Value } = dataType

  switch (dataType.Type) {
    case Type.Bool:
      const boolVal = Value as boolean
      return <>{boolVal.toString()}</>

    case Type.String:
      const strVal = Value as string

      if (Name.toLowerCase() === 'address') {
        // Here we handle special address cases for rendering
        // if the label is `IDAddress`, we want to show the ID address and not fetch the robust
        return label === 'IDAddress' ? (
          <AddressLink id={strVal} fetchAddress={false} hideCopyText={false} />
        ) : (
          <AddressLink address={strVal} fetchAddress hideCopyText={false} />
        )
      }

      if (Name === 'FilecoinNumber') {
        const filVal = new FilecoinNumber(strVal, 'attofil')
        return <>{`${makeFriendlyBalance(filVal, 6)} FIL`}</>
      }

      return <>{Value}</>

    case Type.Number:
      // BigNumber will be stored as a string
      const numVal = Value as number | string
      return <>{numVal}</>

    case Type.Bytes:
      const base64Val = Value as string
      return <>{base64Val}</>

    default:
      throw new Error(`Unexpected DataType: ${JSON.stringify(dataType)}`)
  }
}

interface DataTypeValueProps {
  dataType: DataType
  label?: string
}

DataTypeValue.propTypes = {
  dataType: PropTypes.object.isRequired,
  label: PropTypes.string
}

/**
 * BaseTypeLines
 * Renders any native JavaScript data type on multiple lines (depending on the contents)
 */

export const BaseTypeLines = ({ label, depth, data }: BaseTypeLinesProps) => {
  switch (typeof data) {
    case 'string':
      return (
        <Line label={label} depth={depth}>
          {data}
        </Line>
      )

    case 'bigint':
    case 'boolean':
    case 'function':
    case 'number':
    case 'symbol':
      return (
        <Line label={label} depth={depth}>
          {data.toString()}
        </Line>
      )

    case 'undefined':
      return <NullishLine label={label} depth={depth} />

    case 'object':
      if (data === null) return <NullishLine label={label} depth={depth} />

      if (Array.isArray(data)) {
        return (
          <>
            {data.map((child, i) => (
              <BaseTypeLines
                key={i}
                label={i === 0 ? label : ''}
                depth={depth}
                data={child}
              />
            ))}
          </>
        )
      }

      return <BaseTypeObjLines label={label} depth={depth} data={data} />

    default:
      throw new Error(`Unexpected data type: ${typeof data}`)
  }
}

interface BaseTypeLinesProps {
  label?: string
  depth?: number
  data: any
}

BaseTypeLines.propTypes = {
  label: PropTypes.string,
  depth: PropTypes.number,
  data: PropTypes.any.isRequired
}

/**
 * BaseTypeObjLines
 * Renders a native JavaScript object on multiple lines
 */

export const BaseTypeObjLines = ({
  label,
  depth,
  data
}: BaseTypeObjLinesProps) => (
  <>
    {label && <Line label={label} depth={depth} />}
    {Object.entries(data).map(([key, child]) => (
      <BaseTypeLines
        key={key}
        label={key}
        depth={label ? (depth ?? 0) + 1 : depth}
        data={child}
      />
    ))}
  </>
)

interface BaseTypeObjLinesProps {
  label?: string
  depth?: number
  data: object
}

BaseTypeObjLines.propTypes = {
  label: PropTypes.string,
  depth: PropTypes.number,
  data: PropTypes.object.isRequired
}
