const updateArrayItem = <T>(array: T[], idxToReplace: number, replacement: T) =>
  array.map((original, index) =>
    index === idxToReplace ? replacement : original
  )

export default updateArrayItem
