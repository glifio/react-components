import { render } from '@testing-library/react'

import {
  IconGitHub,
  IconSuccess,
  IconFail,
  IconPending,
  IconClose,
  IconApproximatelyEquals,
  IconCopyAccountAddress,
  IconLedger,
  IconEdit,
  IconGlif,
  IconSafe,
  IconExplorer,
  IconVerifier,
  IconWallet,
  IconNode,
  IconMetaMask,
  IconSpeedUp,
  IconCancel,
  IconCheck,
  IconClock,
  IconSearch,
  IconWarn,
  IconError,
  IconNewTab
} from './index.stories'

describe('Icons', () => {
  test('renders IconGitHub', () => {
    const { container } = render(<IconGitHub {...IconGitHub.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconSuccess', () => {
    const { container } = render(<IconSuccess {...IconSuccess.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconFail', () => {
    const { container } = render(<IconFail {...IconFail.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconPending', () => {
    const { container } = render(<IconPending {...IconPending.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconClose', () => {
    const { container } = render(<IconClose {...IconClose.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconApproximatelyEquals', () => {
    const { container } = render(
      <IconApproximatelyEquals {...IconApproximatelyEquals.args} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconCopyAccountAddress', () => {
    const { container } = render(
      <IconCopyAccountAddress {...IconCopyAccountAddress.args} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconLedger', () => {
    const { container } = render(<IconLedger {...IconLedger.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconEdit', () => {
    const { container } = render(<IconEdit {...IconEdit.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconGlif', () => {
    const { container } = render(<IconGlif {...IconGlif.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconSafe', () => {
    const { container } = render(<IconSafe {...IconSafe.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconExplorer', () => {
    const { container } = render(<IconExplorer {...IconExplorer.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconVerifier', () => {
    const { container } = render(<IconVerifier {...IconVerifier.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconWallet', () => {
    const { container } = render(<IconWallet {...IconWallet.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconNode', () => {
    const { container } = render(<IconNode {...IconNode.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconMetaMask', () => {
    const { container } = render(<IconMetaMask {...IconMetaMask.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconSpeedUp', () => {
    const { container } = render(<IconSpeedUp {...IconSpeedUp.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconCancel', () => {
    const { container } = render(<IconCancel {...IconCancel.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconCheck', () => {
    const { container } = render(<IconCheck {...IconCheck.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconClock', () => {
    const { container } = render(<IconClock {...IconClock.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconSearch', () => {
    const { container } = render(<IconSearch {...IconSearch.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconWarn', () => {
    const { container } = render(<IconWarn {...IconWarn.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconError', () => {
    const { container } = render(<IconError {...IconError.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconNewTab', () => {
    const { container } = render(<IconNewTab {...IconNewTab.args} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
