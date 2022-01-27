import { useContext, createContext, useState, ReactElement } from 'react'
import PropTypes from 'prop-types'
import { MessagePending } from '../../../generated/graphql'

export const PendingMsgContext = createContext<{
  messages: MessagePending[]
  pushPendingMessage: (msg: MessagePending) => void
  clearPendingMessage: (cid: string) => void
}>({
  messages: [],
  pushPendingMessage: () => {},
  clearPendingMessage: () => {}
})

export const PendingMessageProvider = ({
  children
}: {
  children: ReactElement
}) => {
  const [messages, setMessages] = useState<MessagePending[]>([])

  return (
    <PendingMsgContext.Provider
      value={{
        messages,
        pushPendingMessage: (msg: MessagePending) => {
          setMessages(msgs => [...msgs, msg])
        },
        clearPendingMessage: (cid: string) => {
          setMessages(msgs => msgs.filter(m => m.cid !== cid))
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

export const useSubmittedMessages = () => {
  return useContext(PendingMsgContext)
}
