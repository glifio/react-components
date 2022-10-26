import { isTxID, isMsgCID, isTxHash } from '.'

const cid = 'bafy2bzaceb4niobeax5kvnr5xn75zn3hgajylxerpfn2lxcqfsoc3tpuzydds'
const hash =
  '0x0cda6a3470d7faee3d56b4f92acad8b5325cdfed2916eed27e736d122c6b8b39'

describe('isTxID', () => {
  test('it should validate correct transaction IDs', () => {
    expect(isTxID(cid)).toBe(true)
    expect(isTxID(hash)).toBe(true)
  })
  test('it should invalidate incorrect transaction IDs', () => {
    expect(isTxID(cid.slice(0, -1))).toBe(false)
    expect(isTxID(hash.slice(0, -1))).toBe(false)
  })

  test('it should invalidate transaction hashes as message cids', () => {
    expect(isMsgCID(hash)).toBe(false)
  })

  test('it should invalidate message cids as transaction hashes', () => {
    expect(isTxHash(cid)).toBe(false)
  })
})
