import { CID } from 'multiformats/cid'
import { utils } from 'ethers'

export const isTxID = (id: string): boolean => isMsgCID(id) || isTxHash(id)

export const isMsgCID = (cid: string): boolean => {
  try {
    CID.parse(cid)
    return true
  } catch {
    return false
  }
}

export const isTxHash = (hash: string): boolean => utils.isHexString(hash, 32)
