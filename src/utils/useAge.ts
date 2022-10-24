import { ApolloError } from '@apollo/client'
import dayjs from 'dayjs'
import { useTipsetQuery } from '../generated/graphql'

interface UseAgeResult {
  age: string
  loading: boolean
  error?: ApolloError
}

export const useAge = (height: number): UseAgeResult => {
  const {
    data: tipsetData,
    loading,
    error
  } = useTipsetQuery({
    variables: {
      height
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
