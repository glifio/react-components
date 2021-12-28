import { H2 } from '../Typography'
import Box from '../Box'

export function MessageRowColumnTitles() {
  return (
    <Box display='flex' flexDirection='row'>
      <H2>CID</H2>
      <H2>Method</H2>
      <H2>Height</H2>
      <H2>Age</H2>
      <H2>From</H2>
      <H2>To</H2>
      <H2>Value</H2>
      <H2>Txn Fee</H2>
    </Box>
  )
}
