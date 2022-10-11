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
