import { useMemo } from 'react'
import { DataType, describeFEVMLogs } from '@glif/filecoin-actor-utils'
import { useAbi } from '../../utils/useAbi'
import { useGetFEVMLogs } from '../../utils/useGetFEVMLogs'
import { BaseTypeLines, DataTypeLines } from './DataTypes'
import { Line, NullishLine } from './Lines'
import { useLogger } from '../../services'

export const LinesEventLogs = ({ txID, abiSelector }: LinesEventLogsProps) => {
  const logger = useLogger()
  const { abi } = useAbi(abiSelector)
  const { logs } = useGetFEVMLogs(txID)

  const events = useMemo<DataType | null>(() => {
    try {
      if (abi) return describeFEVMLogs(logs, abi)
    } catch (err) {
      logger.error(
        `Failed to describe FEVM event logs: ${JSON.stringify(
          logs
        )}, ${JSON.stringify(abi)}, ${err.message}`
      )
    }
    return null
  }, [logs, abi, logger])

  return (
    <>
      {events ? (
        <DataTypeLines label='Event Logs' dataType={events} />
      ) : logs?.length > 0 ? (
        <>
          <Line label='Event logs' />
          {logs.map((l, i) => (
            <div key={i}>
              <Line label={`Event log ${i}`} depth={1} />
              <BaseTypeLines depth={2} label='Data' data={l.data} />
              <BaseTypeLines depth={2} label='Topics' data={l.topics} />
            </div>
          ))}
        </>
      ) : (
        <NullishLine label='Event logs' />
      )}
    </>
  )
}

type LinesEventLogsProps = {
  txID: string
  abiSelector: string
}
