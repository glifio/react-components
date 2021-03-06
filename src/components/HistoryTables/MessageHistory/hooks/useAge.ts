import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'

import { MessageConfirmedRow, MessagePendingRow } from '../../types'
import { Block, useChainHeadSubscription } from '../../../../generated/graphql'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

const EPOCH_TO_CLOCK_TIME = 30

export const useUnformattedDateTime = (
  message: (MessageConfirmedRow | MessagePendingRow) & {
    block?: Pick<Block, 'Timestamp'>
    height?: number | string
  },
  time: number
) => {
  const [age, setAge] = useState<dayjs.Dayjs | null>(null)

  useChainHeadSubscription({
    variables: {},
    skip: !message || !!message?.block?.Timestamp,
    shouldResubscribe: !age,
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && !subscriptionData.error && !!message) {
        let epochsPast =
          (subscriptionData.data?.chainHead?.height as number) -
          Number(message.height)

        // this message is _in_ chainHead currently or pending
        if (Number(message.height) === 0) {
          epochsPast = 0
        }

        const clockSecondsPast = epochsPast * EPOCH_TO_CLOCK_TIME
        setAge(dayjs(time).subtract(clockSecondsPast, 'seconds'))
      }
    }
  })

  return useMemo(() => {
    // use the high confidence timestamp if we have it
    if (!!message?.block?.Timestamp) {
      return dayjs.unix(message.block?.Timestamp)
    }
    // else we calculate it when the chainhead data comes in
    return age
  }, [age, message?.block?.Timestamp])
}

export const useAge = (message: MessageConfirmedRow, time: number): string => {
  const unformattedTime = useUnformattedDateTime(message, time)
  return unformattedTime ? unformattedTime.from(time) : '...'
}
