import styled from 'styled-components'
import PropTypes from 'prop-types'

import { useNetworkName } from './useNetworkName'
import { useEffect, useMemo, useState } from 'react'
import { useNetworkStatus } from './useNetworkStatus'
import { StatusIcon } from '../Layout'

export * from './useNetworkName'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-s);
`

const getStatusColor = (success, error) => {
  if (success) return 'green'
  if (error) return 'red'
  return 'gray'
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
      <StatusIcon color={getStatusColor(success, error)} />
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
