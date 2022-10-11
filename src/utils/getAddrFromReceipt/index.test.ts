import { CoinType } from '@glif/filecoin-address'
import { getAddrFromReceipt } from '.'

describe('decodeTxReceipt', () => {
  test('it decodes a receipt', () => {
    expect(
      getAddrFromReceipt('gkMA1xJVAvKriskdpguj4VPi+gQa9hMsYso8', CoinType.TEST)
        .robust
    ).toBe('t26kvyvsi5uyf2hykt4l5aigxwcmwgfsr47zul2ri')
    expect(
      getAddrFromReceipt('gkMA1xJVAvKriskdpguj4VPi+gQa9hMsYso8', CoinType.TEST)
        .id
    ).toBe('t02391')
  })
})
