import { BigIntInput, BigIntInputProps } from './BigInt'

export const FilecoinInput = (props: BigIntInputProps) => (
  <BigIntInput {...props} />
)

FilecoinInput.propTypes = BigIntInput.propTypes
FilecoinInput.defaultProps = {
  min: BigInt(0),
  unit: 'FIL'
}
