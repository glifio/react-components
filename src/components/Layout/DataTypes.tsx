import PropTypes from 'prop-types'
import {
  BaseValue,
  DataType,
  DataTypeMap,
  Type
} from '@glif/filecoin-actor-utils'

import { Line } from './Lines'
import { AddressLink } from '../LabeledText/AddressLink'
import { FilecoinNumber } from '@glif/filecoin-number'

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
      return <DataTypeLine label={label} depth={depth} dataType={dataType} />

    case Type.Array:
      const { Contains } = dataType
      const value = dataType.Value as Array<BaseValue>
      return (
        <>
          {value.map((v, i) => (
            <DataTypeLine
              key={i}
              label={i === 0 ? label : ''}
              depth={depth}
              dataType={{ ...Contains, Value: v }}
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
        dataType={dt}
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
    <DataTypeValue dataType={dataType} />
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

export const DataTypeValue = ({ dataType }: DataTypeValueProps) => {
  const { Name, Value } = dataType

  switch (dataType.Type) {
    case Type.Bool:
      const boolVal = Value as boolean
      return <>{boolVal.toString()}</>

    case Type.String:
      const strVal = Value as string

      if (Name === 'Address')
        return (
          <AddressLink address={strVal} fetchAddress hideCopyText={false} />
        )

      if (Name === 'FilecoinNumber')
        return <>{new FilecoinNumber(strVal, 'attofil').toFil() + ' FIL'}</>

      return <>{Value}</>

    case Type.Number:
      const numVal = Value as number
      return <>{numVal}</>

    case Type.Array:
      const arrVal = Value as Array<BaseValue>
      return <>{arrVal.join(', ')}</>

    default:
      throw new Error(`Unexpected DataType: ${JSON.stringify(dataType)}`)
  }
}

interface DataTypeValueProps {
  dataType: DataType
}

DataTypeValue.propTypes = {
  dataType: PropTypes.object.isRequired
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
      return (
        <Line label={label} depth={depth}>
          &ndash;
        </Line>
      )

    case 'object':
      if (data === null)
        return (
          <Line label={label} depth={depth}>
            &ndash;
          </Line>
        )

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
