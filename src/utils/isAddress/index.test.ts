import { isAddress, isEthAddress, isFilAddress } from '.'

const t0 = 't01'
const t1 = 't15ihq5ibzwki2b4ep2f46avlkrqzhpqgtga7pdrq'
const t2 = 't24vg6ut43yw2h2jqydgbg2xq7x6f4kub3bg6as6i'
const t3 =
  't3vvmn62lofvhjd2ugzca6sof2j2ubwok6cj4xxbfzz4yuxfkgobpihhd2thlanmsh3w2ptld2gqkn2jvlss4a'
const t4 = 't410fkkld55ioe7qg24wvt7fu6pbknb56ht7pt4zamxa'
const eth1 = '0x52963EF50e27e06D72D59fcB4F3c2a687BE3cfEf'
const eth2 = '0x8ba1f109551bd432803012645ac136ddd64dba72'
const eth3 = 'XE65GB6LDNXYOFTX0NSV3FUWKOWIXAMJK36'

describe('isAddress', () => {
  test('it should validate correct filecoin addresses', () => {
    expect(isAddress(t0)).toBe(true)
    expect(isAddress(t1)).toBe(true)
    expect(isAddress(t2)).toBe(true)
    expect(isAddress(t3)).toBe(true)
    expect(isAddress(t4)).toBe(true)
  })
  test('it should invalidate incorrect filecoin addresses', () => {
    expect(isAddress(t0.slice(0, -1))).toBe(false)
    expect(isAddress(t1.slice(0, -1))).toBe(false)
    expect(isAddress(t2.slice(0, -1))).toBe(false)
    expect(isAddress(t3.slice(0, -1))).toBe(false)
    expect(isAddress(t4.slice(0, -1))).toBe(false)
  })

  test('it should validate correct ethereum addresses', () => {
    expect(isAddress(eth1)).toBe(true)
    expect(isAddress(eth2)).toBe(true)
    expect(isAddress(eth3)).toBe(true)
  })

  test('it should invalidate incorrect ethereum addresses', () => {
    expect(isAddress(eth1.slice(0, -1))).toBe(false)
    expect(isAddress(eth2.slice(0, -1))).toBe(false)
    expect(isAddress(eth3.slice(0, -1))).toBe(false)
  })

  test('it should invalidate eth addresses as fil addresses', () => {
    expect(isFilAddress(eth1)).toBe(false)
    expect(isFilAddress(eth2)).toBe(false)
    expect(isFilAddress(eth3)).toBe(false)
  })

  test('it should invalidate fil addresses as eth addresses', () => {
    expect(isEthAddress(t0)).toBe(false)
    expect(isEthAddress(t1)).toBe(false)
    expect(isEthAddress(t2)).toBe(false)
    expect(isEthAddress(t3)).toBe(false)
    expect(isEthAddress(t4)).toBe(false)
  })
})
