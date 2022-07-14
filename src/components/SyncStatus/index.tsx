import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'

import {
  useChainHeadSubscription,
  useStatusQuery
} from '../../generated/graphql'
import { WarningBox } from '../Layout'

dayjs.extend(relativeTime.default)

export const SyncStatus = () => {
  const [chainHead, setChainHead] = useState(0)
  const { data } = useStatusQuery()

  useChainHeadSubscription({
    variables: {},
    shouldResubscribe: chainHead === 0,
    onSubscriptionData: ({ subscriptionData }) => {
      if (
        !subscriptionData.loading &&
        !subscriptionData.error &&
        chainHead === 0
      ) {
        setChainHead(subscriptionData.data?.chainHead?.height)
      }
    }
  })

  const syncPercentage = useMemo(() => {
    if (data?.status?.height > 0 && chainHead > 0) {
      const percentage = Math.round(
        ((chainHead - data.status.height) / chainHead) * 100
      )
      const withBounds = Math.min(100, Math.max(0, percentage))
      return withBounds
    }
    return 0
  }, [data?.status?.height, chainHead])

  const estimate = useMemo(() => {
    if (data?.status?.estimate > 0) {
      return dayjs().add(data.status.estimate, 'seconds').fromNow()
    }
    return ''
  }, [data?.status?.estimate])

  return (
    <WarningBox>
      <h3>Sync in Progress</h3>
      {syncPercentage > 0 && (
        <p>
          Our servers are syncing transactions from Filecoin Mainnet. We&apos;re
          currently {syncPercentage}% synced.
        </p>
      )}
      {!!estimate && <p>We expect to be done {estimate}</p>}
    </WarningBox>
  )
}
