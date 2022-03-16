import PropTypes from 'prop-types'
import Box from '../Box'
import Button from '../Button'
import Glyph from '../Glyph'
import OnboardCard from '../Card/OnboardCard'
import { SmartLink } from '../Link/SmartLink'
import { GLIF_DISCORD, GLIF_TWITTER } from '../../constants'

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
        bg='card.error.background'
        color='card.error.foreground'
        borderColor='card.error.background'
        style={{ wordBreak: 'break-word' }}
      >
        <Glyph color='status.fail.foreground' acronym='Er' />
        <h2>{title}</h2>
        <p style={{ fontSize: '1.125rem' }}>{description}</p>
        {linkhref && linkDisplay && (
          <p style={{ fontSize: '1.125rem' }}>
            <SmartLink href={linkhref}>{linkDisplay}</SmartLink>
          </p>
        )}
        <Box
          mt='1.5em'
          pt='1em'
          lineHeight='1.7'
          borderTop='1px solid'
          borderColor='card.error.foreground'
        >
          <SmartLink href={GLIF_DISCORD}>
            Hop in our Discord for any help!
          </SmartLink>
          <br />
          <SmartLink href={GLIF_TWITTER}>
            Follow us on Twitter for updates
          </SmartLink>
        </Box>
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
