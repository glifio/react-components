import { Address } from '../../../../generated/graphql'
import { Badge, Line } from '../../../Layout'
import { useMethodName } from '../hooks/useMethodName'

export function MethodName({ address, params, methodNum }: MethodNameProps) {
  const methodName = useMethodName(address, methodNum, params)
  return (
    <Line label='Method'>
      <Badge color='purple' text={methodName} />
    </Line>
  )
}

type MethodNameProps = {
  address: Address
  params: string
  methodNum: number
}
