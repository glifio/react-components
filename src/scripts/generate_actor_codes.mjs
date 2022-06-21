import LotusRPCEngine from '@glif/filecoin-rpc-client'
import { decode } from '@ipld/dag-cbor'
import { mkdir, writeFile } from 'node:fs/promises';

/**
 * A script for generating the built-in actor actor codes
 *
 * Prints a file to the utils/decodeActorCID with a JSON w data:
 * Record<cidstring, actorname>
 */

const SYSTEM_ACTOR = 'f00'

const templateTS = codes => `
/**
 * THIS FILE WAS GENERATED WITH A SCRIPT, DO NOT EDIT
 */

import { BuiltInActorRegistry } from '../customPropTypes'

export const actorCodes = ${JSON.stringify(codes)} as BuiltInActorRegistry;
`

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

  const dir = `${process.cwd()}/src/generated`
  const file = `${dir}/actorCodes.ts`
  await mkdir(dir, { recursive: true })
  await writeFile(file, Buffer.from(templateTS(json)))
}

main().catch((e) => console.error(`Failed to generate actor codes: ${e.message}`))
