import styled from 'styled-components'
import PropTypes from 'prop-types'

import { useNetworkName } from './useNetworkName'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNetworkStatus } from './useNetworkStatus'
import { StatusIcon } from '../Layout'
import { networks, useEnvironment } from '../../services/EnvironmentProvider'

export * from './useNetworkName'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 8em;
  position: relative;
`

const SelectedNetworkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-s);
  cursor: pointer;
  align-self: center;

  > span {
    text-transform: capitalize;
  }
`

const NetworkOption = styled.li.attrs(({ onClick }) => ({
  role: 'button',
  onClick
}))`
  height: var(--space-xl);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-transform: capitalize;

  &:hover {
    color: var(--purple-medium);
  }
  &:focus {
    color: var(--purple-medium);
  }
`

const NetworkOptionsWrapper = styled.ul`
  visibility: ${({ visibility }) => visibility};
  background-color: var(--white);
  box-shadow: 0 0 0.5em var(--gray-light);
  border-radius: 10px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;

  position: absolute;
  top: var(--space-m);
  width: 100%;

  > div > hr {
    margin: 0;
  }
`

const getStatusColor = (success, connecting, error) => {
  if (connecting) return 'gray'
  if (success) return 'green'
  if (error) return 'red'
  return 'gray'
}

export function NetworkSelector({ errorCallback }: NetworkSelectorProps) {
  const [dropdownVisibility, setDropdownVisibility] = useState<
    'visible' | 'hidden'
  >('hidden')
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
    () => setDropdownVisibility('hidden'),
    [setDropdownVisibility]
  )

  useEffect(() => {
    document.addEventListener('click', closeDropdown)
    return () => document.removeEventListener('click', closeDropdown)
  }, [closeDropdown])

  return (
    <Wrapper>
      <SelectedNetworkWrapper
        onClick={e => {
          e.stopPropagation()
          setDropdownVisibility(
            dropdownVisibility === 'hidden' ? 'visible' : 'hidden'
          )
        }}
      >
        <StatusIcon color={getStatusColor(success, connecting, error)} />
        {!error && (
          <span>{connecting ? 'Loading network' : networkNameFromNode}</span>
        )}
        {error && <span>Error connecting</span>}
        {dropdownVisibility === 'hidden' ? <span>↓</span> : <span>↑</span>}
      </SelectedNetworkWrapper>
      {dropdownVisibility !== 'hidden' && (
        <NetworkOptionsWrapper visibility={dropdownVisibility}>
          {Object.keys(networks)
            .filter(n => !networkNameInState.toLowerCase().includes(n))
            .map((n, i) => (
              <div key={n}>
                {i > 0 && <hr />}
                <NetworkOption onClick={() => setNetwork(networks[n])} key={n}>
                  {n}
                </NetworkOption>
              </div>
            ))}
        </NetworkOptionsWrapper>
      )}
    </Wrapper>
  )
}

export interface NetworkSelectorProps {
  errorCallback?: () => void
}

NetworkSelector.propTypes = {
  errorCallback: PropTypes.func
}
