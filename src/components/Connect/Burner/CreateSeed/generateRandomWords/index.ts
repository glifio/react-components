// Used in onboarding to generate a set of words that the user has
// to guess in order to prove they copied their seed phrase down
export const generateRandomWords = (
  mnemonic: string,
  numIndexes: number
): Set<number> => {
  const numWords = mnemonic.split(' ').length
  const indexes = new Set<number>()

  // Generate the requested number of random indexes
  while (indexes.size < Math.min(numIndexes, numWords)) {
    const index = Math.floor(Math.random() * numWords)
    if (!indexes.has(index)) indexes.add(index)
  }

  // Sort and return the indexes
  return new Set<number>([...indexes].sort((a, b) => a - b))
}
