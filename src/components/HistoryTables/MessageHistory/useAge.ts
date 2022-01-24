import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'

import { MessageConfirmedRow } from '../types'
import { useChainHeadSubscription } from '../../../generated/graphql'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

const EPOCH_TO_CLOCK_TIME = 30

export const useUnformattedDateTime = (
  message: MessageConfirmedRow,
  time: number
) => {
  const [age, setAge] = useState<dayjs.Dayjs | null>(null)

  useChainHeadSubscription({
    variables: {},
    shouldResubscribe: false,
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && !subscriptionData.error) {
        let epochsPast =
          (subscriptionData.data?.chainHead.height as number) -
          Number(message.height)

        // this should never happen
        // but in case the chainhead sub lags behind a couple epochs
        // this ensure we dont show any "in the future" transactions
        if (epochsPast <= 0) {
          epochsPast = 2
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
  return unformattedTime ? unformattedTime.from(time) : ''
}
