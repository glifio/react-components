import LotusRPCEngine from '@glif/filecoin-rpc-client'
import { decode } from '@ipld/dag-cbor'
import fs from 'fs'

/**
 * A script for generating the built-in actor actor codes
 *
 * Prints a file to the utils/decodeActorCID with a JSON w data:
 * Record<cidstring, actorname>
 */

const SYSTEM_ACTOR = 'f00'

const generateActorCIDs = async apiAddress => {
  const lCli = new LotusRPCEngine.default({
    apiAddress
  })

  const systemActorState = await lCli.request(
    'StateReadState',
    SYSTEM_ACTOR,
    null
  )

  // v8 actors not supported, likely mainnet until early july
  if (!systemActorState.State.BuiltinActors) {
    console.log(
      'Built in actor registry not supported on network w rpc: ',
      apiAddress
    )
    return {}
  }

  const obj = await lCli.request(
    'ChainReadObj',
    systemActorState.State.BuiltinActors
  )

  const builtInRegistry = decode(Uint8Array.from(Buffer.from(obj, 'base64')))

  const json = builtInRegistry.reduce((registry, [actorName, cid]) => {
    registry[cid.toString()] = actorName
    return registry
  }, {})

  return json
}

async function main() {
  const supportedNetworkRPCs = [
    'https://api.node.glif.io',
    'https://calibration.node.glif.io'
  ]

  console.log(
    'Fetching actor codes for the following networks: ',
    supportedNetworkRPCs.join(' ')
  )
  const [f, t] = await Promise.all(supportedNetworkRPCs.map(generateActorCIDs))

  // f and t are network codes, f mainnet, t testnet
  const json = { t, f }

  console.log('Fetched actor codes: ', JSON.stringify(json, null, 2))

  fs.writeFileSync(
    `${process.cwd()}/src/utils/decodeActorCID/actorCodes.json`,
    Buffer.from(JSON.stringify(json))
  )
}

main()
