import PropTypes from 'prop-types'
import { DataType, Type } from '@glif/filecoin-actor-utils'

import { Line } from './Lines'
import { AddressLink } from '../LabeledText/AddressLink'
import { useLogger } from '../../services'

/**
 * DataTypeLine
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
  const logger = useLogger()

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

      return <>{Value}</>

    case Type.Number:
      const numVal = Value as number
      return <>{numVal}</>

    case Type.Array:
      const arrVal = Value as Array<boolean | string | number>
      return <>{arrVal.join(', ')}</>

    case Type.Object:
      if (Name === 'Cid') {
        const cid = dataType.Children['/'].Value as string
        return <>CID: {cid}</>
      }
      return <>{JSON.stringify(Value)}</>

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
