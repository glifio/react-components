import { Message } from '@glif/filecoin-message'
import styled from 'styled-components'
import { MESSAGE_PROPTYPE, WALLET_PROPTYPE } from '../../customPropTypes'
import { useEnvironment } from '../../services/EnvironmentProvider'
import { Wallet } from '../../services/WalletProvider'
import { usePotentialDupCID } from '../../utils/usePotentialDupCID'
import { IconCaution } from '../Icons'
import { SmartLink } from '../SmartLink'
import { Colors } from '../theme'

const PotentialDup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    color: ${Colors.BLACK};
    margin-top: var(--space-m);
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: var(--space-m);

    span {
      color: ${Colors.YELLOW_DARK};
      font-size: 1.75rem;
      margin-top: 0;
    }
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
            <div>
              <IconCaution />
              <span>Potential Duplicate Message</span>
            </div>
            <span>
              You&apos;re about to send a message identical to{' '}
              <SmartLink href={`${explorerUrl}/message/`} params={{ cid }}>
                one you recently sent
              </SmartLink>
              . Are you sure you wish to continue?
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
