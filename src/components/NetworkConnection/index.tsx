import styled from 'styled-components'
import { space } from 'styled-system'
import PropTypes from 'prop-types'

import Box from '../Box'
import { P } from '../Typography'
import { useNetworkName } from './useNetworkName'
import { useEffect, useMemo, useState } from 'react'
import { useNetworkStatus } from './useNetworkStatus'

export * from './useNetworkName'

const Wrapper = styled(Box).attrs(props => ({
  height: 6,
  ...props
}))`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  ${space};
`

type Status = Partial<{
  success: boolean
  connecting: boolean
  error: boolean
}>

const statusColor = ({ success, connecting, error }: Status) => {
  if (success) return 'green'
  if (connecting) return 'grey'
  if (error) return 'red'
  return ''
}

const StatusOuter = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid ${statusColor};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StatusInner = styled.div`
  width: 12px;
  height: 12px;
  background: ${statusColor};
  border-radius: 100%;
`

const Status = (props: Status) => (
  <StatusOuter {...props}>
    <StatusInner {...props} />
  </StatusOuter>
)

Status.defaultProps = {
  connecting: true,
  success: false,
  error: false
}

export function NetworkConnection({
  statusApiAddr,
  apiKey,
  lotusApiAddr,
  errorCallback,
  ...props
}: {
  apiKey: string
  statusApiAddr: string
  lotusApiAddr: string
  errorCallback?: () => void
  [x: string]: any
}) {
  const [calledCallback, setCalledCallback] = useState(false)
  const { networkName, error: networkNameErr } = useNetworkName(lotusApiAddr)
  const { networkConnected, error: networkConnectedErr } = useNetworkStatus(
    statusApiAddr,
    apiKey
  )

  const error = useMemo(
    () => networkNameErr || networkConnectedErr,
    [networkNameErr, networkConnectedErr]
  )

  const success = useMemo(
    () => networkName && networkConnected,
    [networkName, networkConnected]
  )

  const connecting = useMemo(() => {
    if (!success && !error) return true
    return false
  }, [success, error])

  useEffect(() => {
    if (error && errorCallback && !calledCallback) {
      setCalledCallback(true)
      errorCallback()
    }
  }, [calledCallback, setCalledCallback, error, errorCallback])

  return (
    <Wrapper {...props}>
      <Status connecting={connecting} error={error} success={success} />
      <P ml={4}>{connecting ? 'Loading network' : networkName}</P>
    </Wrapper>
  )
}

NetworkConnection.propTypes = {
  apiKey: PropTypes.string.isRequired,
  statusApiAddr: PropTypes.string.isRequired,
  lotusApiAddr: PropTypes.string.isRequired,
  errorCallback: PropTypes.func
}
