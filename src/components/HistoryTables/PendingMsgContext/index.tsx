import {
  useContext,
  createContext,
  useState,
  ReactElement,
  Context
} from 'react'
import PropTypes from 'prop-types'
import { GqlMessagePending } from '../../../customPropTypes'
import { useWallet } from '../../../services/WalletProvider/useWallet'

export type PendingMsgContextType = {
  messages: GqlMessagePending[]
  pushPendingMessage: (msg: GqlMessagePending) => void
  clearPendingMessage: (cid: string) => void
}

export const PendingMsgContext = createContext<PendingMsgContextType>({
  messages: [],
  pushPendingMessage: () => {},
  clearPendingMessage: () => {}
})

type Address = string

export const PendingMessageProvider = ({
  children
}: {
  children: ReactElement
}) => {
  const [messages, setMessages] = useState<
    Record<Address, GqlMessagePending[]>
  >({})

  const { address } = useWallet() as { address: Address }

  const messagesByAddress = messages?.[address] || []
  return (
    <PendingMsgContext.Provider
      value={{
        messages: messagesByAddress,
        pushPendingMessage: (msg: GqlMessagePending) => {
          setMessages(msgs => ({
            ...msgs,
            [address]: [...messagesByAddress, msg]
          }))
        },
        clearPendingMessage: (cid: string) => {
          setMessages(msgs => ({
            ...msgs,
            [address]: messagesByAddress.filter(m => m.cid !== cid)
          }))
        }
      }}
    >
      {children}
    </PendingMsgContext.Provider>
  )
}

PendingMessageProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useSubmittedMessages = (
  pendingMsgContext?: Context<PendingMsgContextType>
) => {
  const ctx = pendingMsgContext || PendingMsgContext
  return useContext(ctx)
}
