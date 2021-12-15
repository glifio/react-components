import Box from '../Box'

const OnboardCard = ({ ...props }) => (
  <Box
    display='inline-block'
    width='100%'
    maxWidth={13}
    minHeight={10}
    p={3}
    border={1}
    borderRadius={2}
    borderWidth={1}
    overflow='hidden'
    {...props}
  />
)

export default OnboardCard
