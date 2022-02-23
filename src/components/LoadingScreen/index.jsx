import Box from '../Box'
import Loading from '../LoaderGlyph'
import { Label } from '../Typography'

const LoadingScreen = props => (
  <Box
    position='absolute'
    top='0'
    left='0'
    width='100%'
    height='100%'
    display='flex'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    {...props}
  >
    <Loading width={3} height={3} />
    <Label mt={3}>Loading...</Label>
  </Box>
)

export default LoadingScreen
