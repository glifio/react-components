import base32Decode from 'base32-decode'

export const decodeActorCID = (cid: string): string => {
  let actorCode = ''
  try {
    const decoded = base32Decode(cid.slice(1).toUpperCase(), 'RFC4648')
    actorCode = new TextDecoder('utf-8').decode(decoded.slice(4))
  } catch(e) {
    throw new Error('invalid actor code')
  }
  if (!actorCode.includes('fil/')) {
    throw new Error('unknown actor code')
  }
  return actorCode
}
