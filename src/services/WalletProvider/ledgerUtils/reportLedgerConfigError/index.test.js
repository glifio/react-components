import { reportLedgerConfigError, hasLedgerError } from '.'
import {
  LEDGER_VERSION_PATCH,
  LEDGER_VERSION_MAJOR,
  LEDGER_VERSION_MINOR
} from '../../../../constants'

describe('reportLedgerConfigError', () => {
  test('it gives connectedFailure message', () => {
    const error = reportLedgerConfigError({
      connectedFailure: true,
      transportSupported: true
    })
    expect(error).toEqual('Is your Ledger device plugged in?')
  })

  test('it gives transport unsupported error', () => {
    const error = reportLedgerConfigError({
      transportSupported: false
    })
    expect(error).toEqual(
      "We're sorry, but we can't communicate with your Ledger Device because your browser is incompatible with our Ledger communication mechanism."
    )
  })

  test('it gives busy message', () => {
    const error = reportLedgerConfigError({
      busy: true,
      transportSupported: true
    })
    expect(error).toEqual('Is your Ledger device locked or busy?')
  })

  test('it gives ledgerLocked message', () => {
    const error = reportLedgerConfigError({
      locked: true,
      transportSupported: true
    })
    expect(error).toEqual('Is your Ledger device unlocked?')
  })

  test('it gives filecoinAppNotOpen message', () => {
    const error = reportLedgerConfigError({
      filecoinAppNotOpen: true,
      transportSupported: true
    })
    expect(error).toEqual('Is the Filecoin App open on your Ledger device?')
  })

  test('it gives replug message', () => {
    const error = reportLedgerConfigError({
      replug: true,
      transportSupported: true
    })
    expect(error).toEqual(
      'Please quit the Filecoin app, and unplug/replug your Ledger device, and try again.'
    )
  })

  test('it gives inUseByAnotherApp message', () => {
    const error = reportLedgerConfigError({
      inUseByAnotherApp: true,
      transportSupported: true
    })
    expect(error).toEqual('Please quit any other App using your Ledger device.')
  })

  test('it gives otherError message', () => {
    const errorStub = 'Error message'
    const error = reportLedgerConfigError({
      otherError: errorStub,
      transportSupported: true
    })
    expect(error).toEqual('Error message')
  })

  test('it gives badVersion message', () => {
    const error = reportLedgerConfigError({
      badVersion: true,
      transportSupported: true
    })
    expect(error).toEqual(
      `Please update your Filecoin Ledger app to v${LEDGER_VERSION_MAJOR}.${LEDGER_VERSION_MINOR}.${LEDGER_VERSION_PATCH}, and try again.`
    )
  })
})

describe('hasLedgerError', () => {
  test('returns true for connectedFailure error', () => {
    const error = hasLedgerError({
      connectedFailure: true,
      transportSupported: true
    })
    expect(error).toEqual(true)
  })

  test('returns true for ledgerLocked error', () => {
    const error = hasLedgerError({ locked: true, transportSupported: true })
    expect(error).toEqual(true)
  })

  test('returns true for filecoinAppNotOpen error', () => {
    const error = hasLedgerError({
      filecoinAppNotOpen: true,
      transportSupported: true
    })
    expect(error).toEqual(true)
  })

  test('returns true for replug error', () => {
    const error = hasLedgerError({ replug: true, transportSupported: true })
    expect(error).toEqual(true)
  })

  test('returns true for ledgerBusy error', () => {
    const error = hasLedgerError({ busy: true, transportSupported: true })
    expect(error).toEqual(true)
  })

  test('returns true for inUseByAnotherApp error', () => {
    const error = hasLedgerError({
      inUseByAnotherApp: true,
      transportSupported: true
    })
    expect(error).toEqual(true)
  })

  test('returns true for otherError error', () => {
    const error = hasLedgerError({ otherError: true, transportSupported: true })
    expect(error).toEqual(true)
  })

  test('returns true for badVersion error', () => {
    const error = hasLedgerError({ badVersion: true, transportSupported: true })
    expect(error).toEqual(true)
  })
})
