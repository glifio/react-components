import {
  IconGitHub as IconGitHubComp,
  IconGlif as IconGlifComp,
  IconSuccess as IconSuccessComp,
  IconFail as IconFailComp,
  IconPending as IconPendingComp,
  IconSend as IconSendComp,
  IconReceive as IconReceiveComp,
  IconClose as IconCloseComp,
  IconApproximatelyEquals as IconApproximatelyEqualsComp,
  IconViewAccountAddress as IconViewAccountAddressComp,
  IconCopyAccountAddress as IconCopyAccountAddressComp,
  IconLedger as IconLedgerComp,
  IconViewAddress as IconViewAddressComp,
  IconEdit as IconEditComp,
  AppIconHeaderFooter as AppIconHeaderFooterComp,
  IconMetaMaskFlask as IconMetaMaskComp,
  IconSpeedUp as IconSpeedUpComp,
  IconCancel as IconCancelComp,
  IconCheck as IconCheckComp,
  IconClock as IconClockComp,
  IconSearch as IconSearchComp,
  IconWarn as IconWarnComp,
  IconError as IconErrorComp
} from '.'

export default {
  title: 'Icon/Icon',
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

export const IconGitHub = args => <IconGitHubComp {...args} />

export const IconGlif = args => <IconGlifComp {...args} />

export const IconSuccess = args => <IconSuccessComp {...args} />

export const IconFail = args => <IconFailComp {...args} />

export const IconPending = args => <IconPendingComp {...args} />

export const IconSend = args => <IconSendComp {...args} />

export const IconReceive = args => <IconReceiveComp {...args} />

export const IconClose = args => <IconCloseComp {...args} />

export const IconApproximatelyEquals = args => (
  <IconApproximatelyEqualsComp {...args} />
)

export const IconViewAccountAddress = args => (
  <IconViewAccountAddressComp {...args} />
)

export const IconCopyAccountAddress = args => (
  <IconCopyAccountAddressComp {...args} />
)

export const IconLedger = args => <IconLedgerComp {...args} />

export const IconViewAddress = args => <IconViewAddressComp {...args} />

export const IconEdit = args => <IconEditComp {...args} />

export const AppIconHeaderFooter = args => <AppIconHeaderFooterComp {...args} />

export const IconMetaMask = args => <IconMetaMaskComp {...args} />

export const IconSpeedUp = args => <IconSpeedUpComp {...args} />

export const IconCancel = args => <IconCancelComp {...args} />

export const IconCheck = args => <IconCheckComp {...args} />

export const IconClock = args => <IconClockComp {...args} />

export const IconSearch = args => <IconSearchComp {...args} />

export const IconWarn = args => <IconWarnComp {...args} />

export const IconError = args => <IconErrorComp {...args} />
