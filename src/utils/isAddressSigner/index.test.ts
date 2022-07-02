import { isAddressSigner } from '.'

describe('isAddressSigner', () => {
  test('it confirms non ID address signers', async () => {
    const walletAddress = {
      robust: 't137sjdbgunloi7couiy4l5nc7pd6k2jmq32vizpy',
      id: 't0101'
    }
    const signers = [
      { robust: 't137sjdbgunloi7couiy4l5nc7pd6k2jmq32vizpy', id: '' }
    ]
    expect(isAddressSigner(walletAddress, signers)).toBe(true)
    signers.push({
      robust: 't137sjdbgunloi7couiy4l5nc7pd6k2jmq32vidpy',
      id: ''
    })
    signers.push({
      robust: 't137sjdbgunloi7couiy4l5dsafdsak2jmq32vidpy',
      id: ''
    })
    expect(isAddressSigner(walletAddress, signers)).toBe(true)
  })

  test('it rejects non ID address signers', async () => {
    const walletAddress = {
      robust: 't137sjdbgunloi7couiy4l5nc7pd6k2jmq32vizty',
      id: 't0101'
    }
    const signers = [
      { robust: 't137sjdbgunloi7couiy4l5nc7pd6k2jmq32vizpy', id: '' }
    ]
    expect(isAddressSigner(walletAddress, signers)).toBe(false)
    signers.push({
      robust: 't137sjdbgunloi7couiy4l5nc7pd6k2jmq32vidpy',
      id: ''
    })
    signers.push({
      robust: 't137sjdbgunloi7couiy4l5dsafdsak2jmq32vidpy',
      id: ''
    })
    expect(isAddressSigner(walletAddress, signers)).toBe(false)
  })

  test('it accepts ID address signers', async () => {
    const walletAddress = {
      robust: 't137sjdbgunloi7couiy4l5nc7pd6k2jmq32vizty',
      id: 't01002'
    }
    const signers = [
      { id: 't0100', robust: '' },
      { id: 't01002', robust: '' }
    ]
    expect(isAddressSigner(walletAddress, signers)).toBe(true)
    expect(isAddressSigner({ robust: '', id: 't0100' }, signers)).toBe(true)
  })

  test('it rejects ID address signers', async () => {
    const walletAddress = {
      robust: 't137sjdbgunloi7couiy4l5nc7pd6k2jmq32vizty',
      id: 't01003'
    }
    const signers = [
      { id: 't01001', robust: '' },
      { id: 't01002', robust: '' }
    ]
    expect(isAddressSigner(walletAddress, signers)).toBe(false)
  })
})
