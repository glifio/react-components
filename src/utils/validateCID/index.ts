import { CID } from 'multiformats/cid'

export const validateCID = (cid: string): boolean => {
  try {
    CID.parse(cid)
    return true
  } catch {
    return false
  }
}
