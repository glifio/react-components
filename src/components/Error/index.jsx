import PropTypes from 'prop-types'
import Box from '../Box'
import Button from '../Button'
import Glyph from '../Glyph'
import OnboardCard from '../Card/OnboardCard'
import { StyledATag } from '../Link'
import { Text, Title } from '../Typography'

const ErrorView = ({ description, linkhref, linkDisplay, title, sendHome }) => {
  let sendHomeCB = sendHome
  if (!sendHome) {
    sendHomeCB = () => {
      window.location.href = window.location.origin
    }
  }
  return (
    <div>
      <OnboardCard
        display='flex'
        flexDirection='column'
        borderColor='card.error.background'
        bg='card.error.background'
        color='card.error.foreground'
        minHeight={11}
        style={{ wordBreak: 'break-word' }}
      >
        <Box>
          <Glyph color='status.fail.foreground' acronym='Er' />
          <Title mt={4} mb={2}>
            {title}
          </Title>
          <Text>{description}</Text>
        </Box>
        {linkhref && linkDisplay && (
          <StyledATag
            rel='noopener'
            target='_blank'
            href={linkhref}
            fontSize={3}
            color='core.white'
          >
            {linkDisplay}
          </StyledATag>
        )}
      </OnboardCard>
      <Box mt={5} textAlign='center'>
        <Button variant='secondary' title='Back' onClick={sendHomeCB} />
      </Box>
    </div>
  )
}

ErrorView.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  linkhref: PropTypes.string,
  linkDisplay: PropTypes.string,
  sendHome: PropTypes.func
}

export default ErrorView
