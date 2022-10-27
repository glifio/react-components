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
  IconMetaMask as IconMetaMaskComp,
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

export const IconGitHub = args => <IconGitHubComp height='2em' {...args} />

export const IconSuccess = args => <IconSuccessComp height='1.5em' {...args} />

export const IconFail = args => <IconFailComp height='1.5em' {...args} />

export const IconPending = args => <IconPendingComp height='1.5em' {...args} />

export const IconClose = args => <IconCloseComp height='1em' {...args} />

export const IconApproximatelyEquals = args => (
  <IconApproximatelyEqualsComp height='1.5em' {...args} />
)

export const IconCopyAccountAddress = args => (
  <IconCopyAccountAddressComp height='1em' {...args} />
)

export const IconLedger = args => <IconLedgerComp height='1em' {...args} />

export const IconEdit = args => <IconEditComp height='1em' {...args} />

export const IconGlif = args => <IconGlifComp width='2em' {...args} />

export const IconSafe = args => <IconSafeComp width='2em' {...args} />

export const IconExplorer = args => <IconExplorerComp width='2em' {...args} />

export const IconVerifier = args => <IconVerifierComp width='2em' {...args} />

export const IconWallet = args => <IconWalletComp width='2em' {...args} />

export const IconNode = args => <IconNodeComp width='2em' {...args} />

export const IconMetaMask = args => <IconMetaMaskComp width='10em' {...args} />

export const IconSpeedUp = args => <IconSpeedUpComp height='1em' {...args} />

export const IconCancel = args => <IconCancelComp height='1em' {...args} />

export const IconCheck = args => <IconCheckComp height='1em' {...args} />

export const IconClock = args => <IconClockComp height='1em' {...args} />

export const IconSearch = args => <IconSearchComp height='1em' {...args} />

export const IconWarn = args => <IconWarnComp height='1em' {...args} />

export const IconError = args => <IconErrorComp height='1em' {...args} />

export const IconNewTab = args => <IconNewTabComp height='1em' {...args} />
