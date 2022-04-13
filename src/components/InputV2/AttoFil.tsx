import { BigIntInput, BigIntInputProps } from './BigInt'

export const AttoFilInput = (props: BigIntInputProps) => (
  <BigIntInput {...props} />
)

AttoFilInput.propTypes = BigIntInput.propTypes
AttoFilInput.defaultProps = {
  min: BigInt(0),
  unit: 'aFIL'
}
