import { decodeActorCID } from '.'

describe('decodeActorCID', () => {
  test('it correctly decodes actor CIDs', () => {
    const decoded = decodeActorCID('bafkqadtgnfwc6njpnv2wy5djonuwo')
    expect(decoded).toBe('fil/5/multisig')
  })

  test('it returns unknown actor code for unknown actor codes', () => {
    const decoded = decodeActorCID(
      'bafy2bzacebjxwp6qlcgy6roewkdkzxypsqybdsoaujjjdtmbcokmvo55lktma'
    )
    expect(decoded).toBe('Unknown actor')
  })
})
