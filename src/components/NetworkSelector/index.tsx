import styled from 'styled-components'
import PropTypes from 'prop-types'

import { useNetworkName } from './useNetworkName'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNetworkStatus } from './useNetworkStatus'
import { StatusIcon } from '../Layout'
import { networks, useEnvironment } from '../../services/EnvironmentProvider'
import { Colors } from '../theme'

export * from './useNetworkName'

const NetworkSelectorEl = styled.div`
  position: relative;
  ${props => !props.enableSwitching && `pointer-events: none;`}
`

const SelectedNetwork = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-s);
  cursor: pointer;
  user-select: none;

  .network-name {
    text-transform: capitalize;
  }
`

const NetworkOptions = styled.div`
  position: absolute;
  overflow: hidden;
  top: calc(100% + var(--space-m));
  left: 50%;
  transform: translateX(-50%);
  background-color: ${Colors.WHITE};
  box-shadow: 0 0 0.5em ${Colors.GRAY_LIGHT};
  border-radius: 8px;
`

const NetworkOption = styled.div`
  padding: var(--space-m) var(--space-l);
  cursor: pointer;
  outline: none;
  text-align: center;
  text-transform: capitalize;

  &:not(:first-child) {
    border-top: 1px solid ${Colors.GRAY_LIGHT};
  }

  &:hover,
  &:focus {
    color: ${Colors.PURPLE_MEDIUM};
  }

  &.selected {
    pointer-events: none;
    background-color: ${Colors.PURPLE_MEDIUM};
    color: ${Colors.WHITE};
  }
`

const getStatusColor = (success, connecting, error) => {
  if (connecting) return 'gray'
  if (success) return 'green'
  if (error) return 'red'
  return 'gray'
}

export function NetworkSelector({
  enableSwitching,
  errorCallback
}: NetworkSelectorProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const {
    setNetwork,
    lotusApiUrl,
    nodeStatusApiUrl,
    nodeStatusApiKey,
    networkName: networkNameInState
  } = useEnvironment()

  const [calledCallback, setCalledCallback] = useState(false)
  const {
    networkName: networkNameFromNode,
    error: networkNameErr,
    loading: networkNameLoading
  } = useNetworkName(lotusApiUrl)

  const { networkConnected, error: networkConnectedErr } = useNetworkStatus(
    nodeStatusApiUrl,
    nodeStatusApiKey
  )

  const error = useMemo(
    () => networkNameErr || networkConnectedErr,
    [networkNameErr, networkConnectedErr]
  )

  const success = useMemo(
    () => networkNameFromNode && networkConnected,
    [networkNameFromNode, networkConnected]
  )

  const connecting = useMemo(() => {
    if (!success && !error) return true
    if (
      networkNameLoading &&
      // keeps things from flashing when swr revalidates after first load
      !networkNameFromNode.toLowerCase().includes(networkNameInState)
    )
      return true
    return false
  }, [
    success,
    networkNameLoading,
    networkNameFromNode,
    networkNameInState,
    error
  ])

  useEffect(() => {
    if (error && errorCallback && !calledCallback) {
      setCalledCallback(true)
      errorCallback()
    }
  }, [calledCallback, setCalledCallback, error, errorCallback])

  const closeDropdown = useCallback(
    () => setShowOptions(false),
    [setShowOptions]
  )

  useEffect(() => {
    document.addEventListener('click', closeDropdown)
    return () => document.removeEventListener('click', closeDropdown)
  }, [closeDropdown])

  return (
    <NetworkSelectorEl enableSwitching={enableSwitching}>
      <SelectedNetwork
        onClick={e => {
          e.stopPropagation()
          setShowOptions(!showOptions)
        }}
      >
        <StatusIcon color={getStatusColor(success, connecting, error)} />
        {error ? (
          <span>Error connecting</span>
        ) : connecting ? (
          <span>Loading network</span>
        ) : (
          <span className='network-name'>{networkNameFromNode}</span>
        )}
        {enableSwitching && <span>{showOptions ? '↑' : '↓'}</span>}
      </SelectedNetwork>
      {showOptions && (
        <NetworkOptions>
          {Object.keys(networks).map((n, i) => (
            <NetworkOption
              className={networkNameInState === n ? 'selected' : ''}
              onClick={() => setNetwork(networks[n])}
              role='button'
              tabIndex={i + 1}
              key={n}
            >
              {n}
            </NetworkOption>
          ))}
        </NetworkOptions>
      )}
    </NetworkSelectorEl>
  )
}

export interface NetworkSelectorProps {
  enableSwitching?: boolean
  errorCallback?: () => void
}

NetworkSelector.propTypes = {
  enableSwitching: PropTypes.bool,
  errorCallback: PropTypes.func
}

NetworkSelector.defaultProps = {
  enableSwitching: true
}
