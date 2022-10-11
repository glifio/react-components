import { ApolloError } from '@apollo/client'
import dayjs from 'dayjs'
import { useTipsetQuery } from '../generated/graphql'

export const useAge = (
  height: number | string
): { age: string; loading: boolean; error: ApolloError } => {
  const {
    data: tipsetData,
    loading,
    error
  } = useTipsetQuery({
    variables: {
      height: Number(height)
    },
    skip: !height
  })

  if (!tipsetData?.tipset?.minTimestamp) return { age: '...', loading, error }

  return {
    age: dayjs
      .unix(tipsetData.tipset.minTimestamp)
      .format('YYYY-MM-DD hh:mm:ss'),
    loading,
    error
  }
}
