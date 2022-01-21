import { useContext, createContext, useState, ReactElement } from 'react'
import PropTypes from 'prop-types'
import { MessagePending } from '../../../generated/graphql'

export const PendingMsgContext = createContext<{
  messages: MessagePending[]
  pushPendingMessage: (msg: MessagePending) => void
}>({
  messages: [],
  pushPendingMessage: () => {}
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
