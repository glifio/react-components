import { decodeActorCID } from '.'

describe('decodeActorCID', () => {
  test('it correctly decodes actor CIDs', () => {
    const decoded = decodeActorCID('bafkqadtgnfwc6njpnv2wy5djonuwo')
    expect(decoded).toBe('fil/5/multisig')
  })

  test('it throws an error if the CID is not a valid actor code', () => {
    expect(() => decodeActorCID('abc123')).toThrowError(
      /^Invalid actor CID: .*$/
    )
  })

  test('it throws an error if the CID is not a known actor code', () => {
    expect(() =>
      decodeActorCID(
        'bafy2bzacebjxwp6qlcgy6roewkdkzxypsqybdsoaujjjdtmbcokmvo55lktma'
      )
    ).toThrowError(/^Unknown actor code: .*$/)
  })
})
