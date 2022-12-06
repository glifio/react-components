import { CID } from 'multiformats/cid'
import { utils } from 'ethers'
import { getFEVMHexFromCid, getCidFromFEVMHex } from '@glif/filecoin-message'

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

export const txIDToMsgCID = (txID: string): string | null => {
  if (isMsgCID(txID)) return txID
  if (isTxHash(txID)) return getCidFromFEVMHex(txID)
  return null
}

export const txIDToTxHash = (txID: string): string | null => {
  if (isMsgCID(txID)) return getFEVMHexFromCid(txID)
  if (isTxHash(txID)) return txID
  return null
}
