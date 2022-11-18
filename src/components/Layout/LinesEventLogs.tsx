import { useMemo } from 'react'
import { describeFEVMLogs } from '@glif/filecoin-actor-utils'
import { useAbi } from '../../utils'
import { useChainGetMsgEvents } from '../../utils/useChainGetMsgEvents'
import { BaseTypeLines, DataTypeLines } from './DataTypes'
import { Line, NullishLine } from './Lines'
import { useLogger } from '../../services'

export const LinesEventLogs = ({ txID, abiSelector }: LinesEventLogsProps) => {
  const logger = useLogger()
  const { abi } = useAbi(abiSelector)
  const { logs } = useChainGetMsgEvents(txID, abi)

  const events = useMemo(() => {
    try {
      return describeFEVMLogs(logs, abi)
    } catch (err) {
      logger.error(
        `Failed to describe FEVM event logs: ${JSON.stringify(
          logs
        )}, ${JSON.stringify(abi)}, ${err.message}`
      )
    }
  }, [logs, abi, logger])

  // @navfoo related to https://github.com/glifio/modules/pull/258
  // this seems like it could be cleaned up if we use 1 DataType to represent the event logs
  return (
    <>
      {events?.length > 0 ? (
        <div>
          <Line label='Event logs' />
          {events.map(e => (
            <DataTypeLines key={e.Name} depth={1} label={e.Name} dataType={e} />
          ))}
        </div>
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
