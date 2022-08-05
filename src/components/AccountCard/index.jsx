import styled from 'styled-components'
import { string, func, bool, oneOf } from 'prop-types'
import { ADDRESS_PROPTYPE } from '../../customPropTypes'
import { ButtonV2 } from '../Button/V2'
import { PrimaryBox, Lines } from '../Layout'
import { AddressLink } from '../LabeledText/AddressLink'
import {
  LEDGER,
  CREATE_MNEMONIC,
  IMPORT_MNEMONIC,
  IMPORT_SINGLE_KEY
} from '../../constants'

const AccountBox = styled(PrimaryBox)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 18em;
  height: 18em;

  h3 {
    margin-top: 0;
  }

  h4 {
    color: var(--purple-light);
  }

  .buttons {
    button {
      &:hover {
        color: var(--purple-medium);
        border-color: var(--white);
        background-color: var(--white);
      }
      &:active {
        color: var(--purple-medium) !important;
        border-color: var(--purple-light) !important;
        background-color: var(--purple-light) !important;
      }
    }
  }
`

export const AccountCard = ({
  address,
  onAccountSwitch,
  onShowOnLedger,
  ledgerBusy,
  walletType
}) => {
  return (
    <AccountBox>
      <div>
        <h3>Account</h3>
        <hr />
        <AddressLink
          label='Your Address'
          address={address}
          color='var(--white)'
        />
      </div>
      <div className='buttons'>
        <Lines>
          {walletType === LEDGER && (
            <ButtonV2 white onClick={onShowOnLedger} disabled={ledgerBusy}>
              {ledgerBusy ? 'Check Device' : 'Show on Device'}
            </ButtonV2>
          )}
          {walletType !== IMPORT_SINGLE_KEY && (
            <ButtonV2 white onClick={onAccountSwitch}>
              Switch
            </ButtonV2>
          )}
        </Lines>
      </div>
    </AccountBox>
  )
}

AccountCard.propTypes = {
  /**
   * Filecoin address
   */
  address: ADDRESS_PROPTYPE.isRequired,
  /**
   * Sets background-color of the card
   */
  color: string,
  /**
   * Fired when the "switch" button is clicked
   */
  onAccountSwitch: func.isRequired,
  /**
   * If this wallet represents a ledger
   */
  walletType: oneOf([
    LEDGER,
    CREATE_MNEMONIC,
    IMPORT_MNEMONIC,
    IMPORT_SINGLE_KEY
  ]).isRequired,
  /**
   * If this wallet represents a ledger, the function that gets called when "show on Ledger" button gets clicked
   */
  onShowOnLedger: func,
  /**
   * When true, disable the show on ledger button
   */
  ledgerBusy: bool
}

AccountCard.defaultProps = {
  color: 'white',
  onShowOnLedger: () => {},
  ledgerBusy: false
}
