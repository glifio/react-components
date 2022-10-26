export const truncateString = (
  value: string,
  begin: number = 6,
  end: number = 6
): string =>
  value.length <= begin + end
    ? value
    : `${value.slice(0, begin)} ... ${value.slice(-end)}`

// Support deprecated truncateAddress
export const truncateAddress = truncateString
