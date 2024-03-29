import { FILSNAP } from '../../../constants'

export * from './errorHandling'
export * from './state'

export const connectFILSnap = async (snapId: string = FILSNAP) => {
  await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: {}
    }
  })
}
