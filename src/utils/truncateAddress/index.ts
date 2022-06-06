export default (address: string, begin: number = 6, end: number = 6) =>
  address.length <= begin + end
    ? address
    : `${address.slice(0, begin)} ... ${address.slice(-end)}`
