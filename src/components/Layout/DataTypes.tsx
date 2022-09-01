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
