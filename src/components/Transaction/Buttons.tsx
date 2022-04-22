import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { ButtonV2 } from '../Button/V2'
import { ButtonRowSpaced } from '../Layout/Buttons'

export const TransactionButtons = ({
  cancelDisabled,
  sendDisabled,
  onClickSend
}: TransactionButtonsProps) => {
  const router = useRouter()
  return (
    <ButtonRowSpaced>
      <ButtonV2 large disabled={cancelDisabled} onClick={() => router.back()}>
        Cancel
      </ButtonV2>
      <ButtonV2 large green disabled={sendDisabled} onClick={onClickSend}>
        Send
      </ButtonV2>
    </ButtonRowSpaced>
  )
}

interface TransactionButtonsProps {
  cancelDisabled: boolean
  sendDisabled: boolean
  onClickSend: () => void
}

TransactionButtons.propTypes = {
  cancelDisabled: PropTypes.bool.isRequired,
  sendDisabled: PropTypes.bool.isRequired,
  onClickSend: PropTypes.func.isRequired
}
