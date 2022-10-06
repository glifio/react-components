import {
  IconGitHub as IconGitHubComp,
  IconSuccess as IconSuccessComp,
  IconFail as IconFailComp,
  IconPending as IconPendingComp,
  IconClose as IconCloseComp,
  IconApproximatelyEquals as IconApproximatelyEqualsComp,
  IconCopyAccountAddress as IconCopyAccountAddressComp,
  IconLedger as IconLedgerComp,
  IconEdit as IconEditComp,
  IconGlif as IconGlifComp,
  IconSafe as IconSafeComp,
  IconExplorer as IconExplorerComp,
  IconVerifier as IconVerifierComp,
  IconWallet as IconWalletComp,
  IconNode as IconNodeComp,
  IconMetaMaskFlask as IconMetaMaskComp,
  IconSpeedUp as IconSpeedUpComp,
  IconCancel as IconCancelComp,
  IconCheck as IconCheckComp,
  IconClock as IconClockComp,
  IconSearch as IconSearchComp,
  IconWarn as IconWarnComp,
  IconError as IconErrorComp,
  IconNewTab as IconNewTabComp
} from '.'

export default {
  title: 'Icon/Icon',
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

export const IconGitHub = args => <IconGitHubComp {...args} />

export const IconSuccess = args => <IconSuccessComp {...args} />

export const IconFail = args => <IconFailComp {...args} />

export const IconPending = args => <IconPendingComp {...args} />

export const IconClose = args => <IconCloseComp {...args} />

export const IconApproximatelyEquals = args => (
  <IconApproximatelyEqualsComp {...args} />
)

export const IconCopyAccountAddress = args => (
  <IconCopyAccountAddressComp {...args} />
)

export const IconLedger = args => <IconLedgerComp {...args} />

export const IconEdit = args => <IconEditComp {...args} />

export const IconGlif = args => <IconGlifComp {...args} />

export const IconSafe = args => <IconSafeComp {...args} />

export const IconExplorer = args => <IconExplorerComp {...args} />

export const IconVerifier = args => <IconVerifierComp {...args} />

export const IconWallet = args => <IconWalletComp {...args} />

export const IconNode = args => <IconNodeComp {...args} />

export const IconMetaMask = args => <IconMetaMaskComp {...args} />

export const IconSpeedUp = args => <IconSpeedUpComp {...args} />

export const IconCancel = args => <IconCancelComp {...args} />

export const IconCheck = args => <IconCheckComp {...args} />

export const IconClock = args => <IconClockComp {...args} />

export const IconSearch = args => <IconSearchComp {...args} />

export const IconWarn = args => <IconWarnComp {...args} />

export const IconError = args => <IconErrorComp {...args} />

export const IconNewTab = args => <IconNewTabComp {...args} />
