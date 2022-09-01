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
 * The value should be singular, not an array or object.
 */

export const DataTypeValue = ({ dataType }: DataTypeValueProps) => {
  const { Name: name, Type: type, Value: value } = dataType
  const logger = useLogger()

  switch (type) {
    case Type.String:
      const strVal = value as string

      if (dataType.Name === 'Address')
        return <AddressLink address={strVal} fetchAddress hideCopyText={false} />

      return <>{value}</>

    case Type.Bool:
      const boolVal = value as boolean
      return <>{boolVal.toString()}</>

    case Type.Number:
      const numVal = value as number
      return <>{numVal}</>
  }

  logger.warn(
    `Failed to interpret DataType, name: ${name}, type: ${type}, value: ${value}`
  )
  
  return <>{value}</>
}

interface DataTypeValueProps {
  dataType: DataType
}

DataTypeValue.propTypes = {
  dataType: PropTypes.object.isRequired
}
