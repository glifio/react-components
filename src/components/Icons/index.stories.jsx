import {
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
  IconMessageStatus as IconMessageStatusComp,
  IconLedger as IconLedgerComp,
  IconViewAddress as IconViewAddressComp,
  IconEdit as IconEditComp,
  AppIconHeaderFooter as AppIconHeaderFooterComp,
  IconCaution as IconCautionComp,
  IconMetaMaskFlask as IconMetaMaskComp,
  IconSearch as IconSearchComp
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

// const Template = (args) => <IconsSample {...args} />

export const IconGlif = args => <IconGlifComp {...args} />
IconGlif.args = {}

export const IconSuccess = args => <IconSuccessComp {...args} />
IconSuccess.args = {}

export const IconFail = args => <IconFailComp {...args} />
IconFail.args = {}

export const IconPending = args => <IconPendingComp {...args} />
IconPending.args = {}

export const IconSend = args => <IconSendComp {...args} />
IconSend.args = {}

export const IconReceive = args => <IconReceiveComp {...args} />
IconReceive.args = {}

export const IconClose = args => <IconCloseComp {...args} />
IconClose.args = {}

export const IconApproximatelyEquals = args => (
  <IconApproximatelyEqualsComp {...args} />
)
IconApproximatelyEquals.args = {}

export const IconViewAccountAddress = args => (
  <IconViewAccountAddressComp {...args} />
)
IconViewAccountAddress.args = {}

export const IconCopyAccountAddress = args => (
  <IconCopyAccountAddressComp {...args} />
)
IconCopyAccountAddress.args = {}

export const IconMessageStatus = args => <IconMessageStatusComp {...args} />
IconMessageStatus.args = {
  status: 'confirmed'
}
IconMessageStatus.argTypes = {
  status: {
    control: {
      type: 'inline-radio',
      options: ['confirmed', 'pending']
    }
  }
}

export const IconLedger = args => <IconLedgerComp {...args} />
IconLedger.args = {}

export const IconViewAddress = args => <IconViewAddressComp {...args} />
IconViewAddress.args = {}

export const IconEdit = args => <IconEditComp {...args} />
IconEdit.args = {
  fill: 'yellow',
  stroke: 'blue'
}

export const AppIconHeaderFooter = args => <AppIconHeaderFooterComp {...args} />

export const IconCaution = args => <IconCautionComp {...args} />

export const IconMetaMask = args => <IconMetaMaskComp {...args} />

export const IconSearch = args => <IconSearchComp {...args} />
