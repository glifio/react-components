import { forwardRef } from 'react'
import Box from '../Box'

type CardProps = {
  [x: string]: any
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ ...props }, ref) => (
  <Box
    display='inline-block'
    width={300}
    p={3}
    border={1}
    borderRadius={2}
    borderWidth={1}
    overflow='hidden'
    ref={ref}
    {...props}
  />
))

export default Card
