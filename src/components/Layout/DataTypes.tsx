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
