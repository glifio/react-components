import { useEffect, useState } from 'react'
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
  const chainheadSub = useChainHeadSubscription({
    variables: {},
    shouldResubscribe: false
  })

  const [age, setAge] = useState<dayjs.Dayjs | null>(null)

  useEffect(() => {
    if (!age && !!message) {
      if (message.block?.Timestamp) {
        setAge(dayjs.unix(message.block?.Timestamp))
      } else if (!(chainheadSub.loading || chainheadSub.error)) {
        let epochsPast =
          (chainheadSub.data?.chainHead.height as number) -
          Number(message.height)

        // weird race conditions...
        if (epochsPast <= 0) {
          epochsPast = 2
        }

        const clockSecondsPast = epochsPast * EPOCH_TO_CLOCK_TIME
        setAge(dayjs(time).subtract(clockSecondsPast, 'seconds'))
      }
    }
  }, [time, message, chainheadSub, age, setAge])
  return age
}

export const useAge = (message: MessageConfirmedRow, time: number): string => {
  const unformattedTime = useUnformattedDateTime(message, time)
  return unformattedTime ? unformattedTime.from(time) : ''
}
