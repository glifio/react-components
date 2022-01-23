import { useEffect, useState } from 'react'
import { SubscriptionResult } from '@apollo/client'
import dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'

import { MessageConfirmedRow } from '../types'
import { ChainHeadSubscription } from '../../../generated/graphql'

// add RelativeTime plugin to Day.js
dayjs.extend(relativeTime.default)

const EPOCH_TO_CLOCK_TIME = 30

export const useAge = (
  chainheadSub: SubscriptionResult<ChainHeadSubscription, any>,
  message: MessageConfirmedRow,
  time: number
) => {
  const [age, setAge] = useState(null)

  useEffect(() => {
    if (message.block?.Timestamp) {
      setAge(dayjs.unix(message.block?.Timestamp).from(time))
    } else if (!age) {
      if (!(chainheadSub.loading || chainheadSub.error)) {
        const epochsPast =
          (chainheadSub.data?.chainHead.height as number) -
          Number(message.height)

        const clockSecondsPast = epochsPast * EPOCH_TO_CLOCK_TIME
        setAge(
          dayjs(Date.now()).subtract(clockSecondsPast, 'seconds').from(time)
        )
      }
    }
  }, [time, message, chainheadSub, age, setAge])
  return age ? age : ''
}
