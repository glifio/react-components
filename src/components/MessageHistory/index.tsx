import { useQuery } from '@apollo/client'
import { MESSAGES, MessagesVars } from './queries'
import { MessageBase } from './types'

type MessageHistoryTableProps = {
  address: string
}

export default function MessageHistoryTable(props: MessageHistoryTableProps) {
  const { loading, error, data } = useQuery<MessageBase[], MessagesVars>(
    MESSAGES,
    {
      variables: {
        limit: 10,
        offset: 0,
        address: props.address
      }
    }
  )
  console.log(data, error)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return <div></div>
}

MessageHistoryTable.propTypes = {}
