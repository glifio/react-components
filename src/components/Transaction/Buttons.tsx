import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { ButtonV2 } from '../Button/V2'
import { ButtonRowSpaced } from '../Layout'

export const TransactionButtons = ({
  backDisabled,
  nextDisabled,
  backText,
  nextText,
  onClickBack,
  onClickNext
}: TransactionButtonsProps) => {
  const router = useRouter()
  const onBack = onClickBack ? onClickBack : router ? router.back : () => {}
  return (
    <ButtonRowSpaced>
      <ButtonV2 large type='button' disabled={backDisabled} onClick={onBack}>
        {backText}
      </ButtonV2>
      <ButtonV2
        large
        green
        type='submit'
        disabled={nextDisabled}
        onClick={onClickNext}
      >
        {nextText}
      </ButtonV2>
    </ButtonRowSpaced>
  )
}

export interface TransactionButtonsProps {
  backDisabled?: boolean
  nextDisabled?: boolean
  backText?: string
  nextText?: string
  onClickBack?: () => void
  onClickNext?: () => void
}

TransactionButtons.propTypes = {
  backDisabled: PropTypes.bool,
  nextDisabled: PropTypes.bool,
  backText: PropTypes.string,
  nextText: PropTypes.string,
  onClickBack: PropTypes.func,
  onClickNext: PropTypes.func
}

TransactionButtons.defaultProps = {
  backDisabled: false,
  nextDisabled: false,
  backText: 'Back',
  nextText: 'Next'
}
