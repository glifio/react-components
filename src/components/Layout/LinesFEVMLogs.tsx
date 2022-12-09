import { useMemo } from 'react'
import { DataType, describeFEVMLogs } from '@glif/filecoin-actor-utils'

import { useAbi } from '../../utils/useAbi'
import { useGetFEVMLogs } from '../../utils/useGetFEVMLogs'
import { useLogger } from '../../services/EnvironmentProvider'
import { BaseTypeLines, DataTypeLines } from './DataTypes'
import { NullishLine } from './Lines'

export const LinesFEVMLogs = ({ txHash, address }: LinesEventLogsProps) => {
  const logger = useLogger()
  const { abi } = useAbi(address)
  const { logs } = useGetFEVMLogs(txHash)

  const describedLogs = useMemo<DataType | null>(() => {
    try {
      if (abi) return describeFEVMLogs(logs, abi)
    } catch (e) {
      const logsStr = JSON.stringify(logs)
      const abiStr = JSON.stringify(abi)
      logger.error(
        `Failed to describe FEVM event logs for address: ${address}, txHash: ${txHash}, logs: ${logsStr}, abi: ${abiStr}, with message: ${e.message}`
      )
    }
    return null
  }, [logs, abi, logger, txHash, address])

  if (describedLogs)
    return <DataTypeLines label='Event logs' dataType={describedLogs} />

  if (logs?.length)
    return (
      <BaseTypeLines
        label='Event logs (upload abi to decode)'
        data={Object.fromEntries(
          logs.map(({ data, topics }, i) => [
            `Event log ${i}`,
            { data, topics }
          ])
        )}
      />
    )

  return <NullishLine label='Event logs' />
}

type LinesEventLogsProps = {
  txHash: string
  address: string
}
