import PropTypes from 'prop-types'
import Box from '../Box'
import Button from '../Button'
import Glyph from '../Glyph'
import { SmartLink } from '../SmartLink'
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
          borderTop='1px solid'
          borderColor='card.error.foreground'
        >
          Get help in <SmartLink href={GLIF_DISCORD}>Discord</SmartLink> or hit
          us up on <SmartLink href={GLIF_TWITTER}>Twitter</SmartLink>
        </Box>
      </Box>
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
