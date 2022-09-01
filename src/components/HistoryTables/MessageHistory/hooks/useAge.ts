import dayjs from 'dayjs'
import { MessageConfirmedRow, MessagePendingRow } from '../../types'
import { useTipsetQuery } from '../../../../generated/graphql'

export const useAge = (
  message: (MessageConfirmedRow | MessagePendingRow) & {
    height?: number | string
  }
): string => {
  const { data: tipsetData } = useTipsetQuery({
    variables: {
      height: Number(message?.height)
    },
    skip: !message || !message?.height
  })

  if (!tipsetData?.tipset?.minTimestamp) return '...'

  return dayjs
    .unix(tipsetData.tipset.minTimestamp)
    .format('YYYY-MM-DD hh:mm:ss')
}
