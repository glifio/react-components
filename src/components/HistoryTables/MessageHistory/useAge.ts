import { useEffect, useState } from 'react'
import { SubscriptionResult } from '@apollo/client'
import dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'

import { MessageConfirmedRow } from '../types'
import { ChainHeadSubscription } from '../../../generated/graphql'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

const EPOCH_TO_CLOCK_TIME = 30

export const useUnformattedDateTime = (
  chainheadSub: SubscriptionResult<ChainHeadSubscription, any>,
  message: MessageConfirmedRow,
  time: number
) => {
  const [age, setAge] = useState<dayjs.Dayjs | null>(null)

  useEffect(() => {
    if (!age && !!message) {
      if (message.block?.Timestamp) {
        setAge(dayjs.unix(message.block?.Timestamp))
      } else if (!(chainheadSub.loading || chainheadSub.error)) {
        const epochsPast =
          (chainheadSub.data?.chainHead.height as number) -
          Number(message.height)

        const clockSecondsPast = epochsPast * EPOCH_TO_CLOCK_TIME
        setAge(dayjs(Date.now()).subtract(clockSecondsPast, 'seconds'))
      }
    }
  }, [time, message, chainheadSub, age, setAge])
  return age
}

export const useAge = (
  chainheadSub: SubscriptionResult<ChainHeadSubscription, any>,
  message: MessageConfirmedRow,
  time: number
): string => {
  const unformattedTime = useUnformattedDateTime(chainheadSub, message, time)
  return unformattedTime ? unformattedTime.from(time) : ''
}
