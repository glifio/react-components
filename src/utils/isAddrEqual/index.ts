import { Address } from '../../generated/graphql'

export const isAddrEqual = (address: Address, addressStr: string): boolean => {
  const noNetworkAddr = addressStr.slice(1)
  const noNetworkID = address?.id?.slice(1)
  const noNetworkRobust = address?.robust?.slice(1)

  return noNetworkAddr === noNetworkID || noNetworkAddr === noNetworkRobust
}
