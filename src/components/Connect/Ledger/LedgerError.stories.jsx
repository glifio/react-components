import { initialLedgerState } from '../../../services/WalletProvider'
import { Dialog } from '../../Layout'
import { LedgerError } from './LedgerError'

/**
 * LEDGER STATE
 *
 * userImportFailure: boolean
 * connecting: boolean
 * connectedFailure: boolean
 * locked: boolean
 * unlocked: boolean
 * busy: boolean
 * filecoinAppNotOpen: boolean
 * badVersion: boolean
 * transportSupported: boolean
 * inUseByAnotherApp: boolean
 * replug: boolean
 */

const ledgerState = newLedgerState => ({
  ...initialLedgerState,
  ...newLedgerState
})

export default {
  title: 'Connect/LedgerError',
  component: LedgerError,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Dialog>{Story()}</Dialog>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <LedgerError {...args} />

export const NoError = Template.bind({})
NoError.args = ledgerState()

export const UserImportError = Template.bind({})
UserImportError.args = ledgerState({ userImportFailure: true, locked: true })
