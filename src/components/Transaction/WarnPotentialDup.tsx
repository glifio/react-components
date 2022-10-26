import { Message } from '@glif/filecoin-message'
import { MESSAGE_PROPTYPE, WALLET_PROPTYPE } from '../../customPropTypes'
import { useEnvironment } from '../../services/EnvironmentProvider'
import { Wallet } from '../../services/WalletProvider'
import { usePotentialDupCID } from '../../utils/usePotentialDupCID'
import { IconCaution } from '../Icons'
import { Badge } from '../Layout'
import { SmartLink } from '../SmartLink'

export const WarnPotentialDup = ({
  wallet,
  message
}: WarnPotentialDupPropTypes) => {
  const cid = usePotentialDupCID(wallet, message)
  const { explorerUrl } = useEnvironment()
  return (
    <>
      {cid && (
        <>
          <hr />
          <span>
            <Badge
              icon={<IconCaution />}
              color='yellow'
              text='Potential Duplicate Message'
            />
          </span>
          <p>
            You&apos;re about to send a message identical to{' '}
            <SmartLink href={`${explorerUrl}/tx/${cid}`}>
              one you recently sent
            </SmartLink>
            .
          </p>
        </>
      )}
    </>
  )
}

type WarnPotentialDupPropTypes = {
  message: Message
  wallet: Wallet
}

WarnPotentialDup.propTypes = {
  message: MESSAGE_PROPTYPE.isRequired,
  wallet: WALLET_PROPTYPE.isRequired
}
