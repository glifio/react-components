import { InMemoryCacheConfig } from '@apollo/client'

// The params field is expected to be a JSON string
// or null. Both are safe to pass to JSON parse. The
// result should be a valid javascript object or null.
const parseParams = (_: any, incoming: any) => {
  try {
    if (incoming) {
      let params = JSON.parse(incoming)
      if (typeof params.Value === 'object' && !!params.Value.Int) {
        params.Value = params.Value.Int
      }
      return params
    }
    return null
  } catch (e) {
    console.error(e)
    return null
  }
}

export function removeMessageDups(
  existing: { __ref: any }[],
  incoming: { __ref: any }[],
  args: { offset: number; limit: number }
) {
  const head = [...existing]
  const tail = head.splice(args.offset * args.limit)
  const merged = [].concat(head, incoming, tail)

  const found = new Set([])
  return [...merged].filter(ele => {
    if (!found.has(ele.__ref)) {
      found.add(ele.__ref)
      return true
    }

    return false
  })
}

export const defaultMessageHistoryClientCacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        messages: {
          // Cache separate results based on address passed as arg
          keyArgs: ['address'],
          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing = [], incoming = [], { args }) {
            return removeMessageDups(
              existing ? [...existing] : [],
              incoming ? [...incoming] : [],
              args as unknown as { limit: number; offset: number }
            )
          }
        },
        message: {
          read(_, { args, toReference }) {
            return toReference({
              __typename: 'Message',
              cid: args.cid
            })
          }
        }
      }
    },
    Block: {
      keyFields: ['cid']
    },
    Message: {
      keyFields: ['cid'],
      fields: {
        params: {
          merge: parseParams
        }
      }
    },
    Tipset: {
      keyFields: ['height']
    },
    StateReplay: {
      keyFields: ['cid']
    },
    Address: {
      keyFields: ['robust', 'id']
    },
    MessagePending: {
      keyFields: ['cid'],
      fields: {
        params: {
          merge: parseParams
        }
      }
    },
    MsigTransaction: {
      keyFields: ['id'],
      fields: {
        params: {
          merge: parseParams
        }
      }
    }
  }
}
