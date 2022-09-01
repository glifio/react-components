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
  return <>{dataType.Value}</>
}

interface DataTypeValueProps {
  dataType: DataType
}

DataTypeValue.propTypes = {
  dataType: PropTypes.object.isRequired
}
