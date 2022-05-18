const generate = (
  setOfRandomNums: Set<number>,
  numRandoms: number,
  numWords: number
) => {
  if (setOfRandomNums.size === numRandoms) return setOfRandomNums

  const randomNum = Math.round(Math.random() * numWords)
  if (setOfRandomNums.has(randomNum))
    return generate(setOfRandomNums, numRandoms, numWords)

  setOfRandomNums.add(randomNum)
  return generate(setOfRandomNums, numRandoms, numWords)
}

// Used in onboarding to generate a set of words that the user has to guess in order to prove they copied their seed phrase down
export default function generateRandomWords(
  mnemonic: string,
  numRandoms: number
): Set<number> {
  const indexes = new Set([])
  return new Set(
    [
      ...generate(indexes, numRandoms, Number(mnemonic.split(' ').length) - 1)
    ].sort((a, b) => a - b)
  )
}
