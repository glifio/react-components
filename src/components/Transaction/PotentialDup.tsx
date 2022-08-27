import { Message } from '@glif/filecoin-message'
import styled from 'styled-components'
import { MESSAGE_PROPTYPE, WALLET_PROPTYPE } from '../../customPropTypes'
import { useEnvironment } from '../../services/EnvironmentProvider'
import { Wallet } from '../../services/WalletProvider'
import { usePotentialDupCID } from '../../utils/usePotentialDupCID'
import { IconCaution } from '../Icons'
import { Badge } from '../Layout'
import { SmartLink } from '../SmartLink'

const PotentialDup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    margin-bottom: var(--space-m);
  }
`

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
          <PotentialDup>
            <Badge
              icon={<IconCaution />}
              color='yellow'
              text='Potential Duplicate Message'
            />
            <span>
              You&apos;re about to send a message identical to{' '}
              <SmartLink href={`${explorerUrl}/message/`} params={{ cid }}>
                one you recently sent
              </SmartLink>
              . <br />
              Are you sure you wish to continue?
            </span>
          </PotentialDup>
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
