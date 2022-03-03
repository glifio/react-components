import styled from 'styled-components'
import PropTypes from 'prop-types'

import { useNetworkName } from './useNetworkName'
import { useEffect, useMemo, useState } from 'react'
import { useNetworkStatus } from './useNetworkStatus'

export * from './useNetworkName'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4em;
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
  position: relative;
  width: 18px;
  height: 18px;
  border: 1px solid ${statusColor};
  border-radius: 50%;
`

const StatusInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 11px;
  height: 11px;
  background: ${statusColor};
  border-radius: 50%;
  transform: translate(-50%, -50%);
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
  errorCallback
}: NetworkConnectionProps) {
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
    <Wrapper>
      <Status connecting={connecting} error={error} success={success} />
      <span>{connecting ? 'Loading network' : networkName}</span>
    </Wrapper>
  )
}

export interface NetworkConnectionProps {
  apiKey: string
  statusApiAddr: string
  lotusApiAddr: string
  errorCallback?: () => void
}

NetworkConnection.propTypes = {
  apiKey: PropTypes.string.isRequired,
  statusApiAddr: PropTypes.string.isRequired,
  lotusApiAddr: PropTypes.string.isRequired,
  errorCallback: PropTypes.func
}
