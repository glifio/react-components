export const getFriendlyError = (error: Error | string): string => {
  const message = error instanceof Error ? error.message : error
  if (message.toLowerCase().includes('retcode=2'))
    return 'Your Safe owner account does not have sufficient funds to pay for the transaction fee.'
  if (message.toLowerCase().includes('retcode=6'))
    return 'This account does not have enough FIL to pay for the transaction and transaction fee.'
  return message
}
