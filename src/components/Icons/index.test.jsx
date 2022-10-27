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
    const { container } = render(<IconGitHub height='2em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconSuccess', () => {
    const { container } = render(<IconSuccess height='1.5em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconFail', () => {
    const { container } = render(<IconFail height='1.5em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconPending', () => {
    const { container } = render(<IconPending height='1.5em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconClose', () => {
    const { container } = render(<IconClose height='1em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconApproximatelyEquals', () => {
    const { container } = render(<IconApproximatelyEquals height='1.5em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconCopyAccountAddress', () => {
    const { container } = render(<IconCopyAccountAddress height='1em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconLedger', () => {
    const { container } = render(<IconLedger height='1em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconEdit', () => {
    const { container } = render(<IconEdit height='1em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconGlif', () => {
    const { container } = render(<IconGlif width='2em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconSafe', () => {
    const { container } = render(<IconSafe width='2em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconExplorer', () => {
    const { container } = render(<IconExplorer width='2em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconVerifier', () => {
    const { container } = render(<IconVerifier width='2em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconWallet', () => {
    const { container } = render(<IconWallet width='2em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconNode', () => {
    const { container } = render(<IconNode width='2em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconMetaMask', () => {
    const { container } = render(<IconMetaMask width='10em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconSpeedUp', () => {
    const { container } = render(<IconSpeedUp height='1em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconCancel', () => {
    const { container } = render(<IconCancel height='1em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconCheck', () => {
    const { container } = render(<IconCheck height='1em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconClock', () => {
    const { container } = render(<IconClock height='1em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconSearch', () => {
    const { container } = render(<IconSearch height='1em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconWarn', () => {
    const { container } = render(<IconWarn height='1em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconError', () => {
    const { container } = render(<IconError height='1em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('renders IconNewTab', () => {
    const { container } = render(<IconNewTab height='1em' />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
