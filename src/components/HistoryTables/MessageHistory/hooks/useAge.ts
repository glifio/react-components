import dayjs, { Dayjs } from 'dayjs'
import { MessageConfirmedRow, MessagePendingRow } from '../../types'
import { useTipsetQuery } from '../../../../generated/graphql'

export const useUnformattedDateTime = (message: AgeHookArgs): Dayjs | null => {
  const { data: tipsetData } = useTipsetQuery({
    variables: {
      height: Number(message?.height)
    },
    skip: !message || !message?.height
  })

  if (!tipsetData?.tipset?.minTimestamp) return null

  return dayjs.unix(tipsetData.tipset.minTimestamp)
}

export const useAge = (message: AgeHookArgs): string => {
  const unformattedTime = useUnformattedDateTime(message)
  return unformattedTime ? unformattedTime.format('YYYY-MM-DD hh:mm:ss') : '...'
}

type AgeHookArgs = (MessageConfirmedRow | MessagePendingRow) & {
  height?: number | string
}
