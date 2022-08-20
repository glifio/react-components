import styled from 'styled-components'
import PropTypes from 'prop-types'

import { useNetworkName } from './useNetworkName'
import { useEffect, useMemo, useState } from 'react'
import { useNetworkStatus } from './useNetworkStatus'
import { StatusIcon } from '../Layout'
import { networks, useEnvironment } from '../../services/EnvironmentProvider'

export * from './useNetworkName'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const SelectedNetworkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-s);
  cursor: pointer;
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

  > hr {
    margin: 0;
    width: 80%;
    align-self: center;
  }
`

const getStatusColor = (success, error) => {
  if (success) return 'green'
  if (error) return 'red'
  return 'gray'
}

export function NetworkSelector({ errorCallback }: NetworkSelectorProps) {
  const [dropdownVisibility, setDropdownVisibility] = useState<
    'visible' | 'hidden'
  >('hidden')
  const { setNetwork, lotusApiUrl, nodeStatusApiUrl, nodeStatusApiKey } =
    useEnvironment()
  const [calledCallback, setCalledCallback] = useState(false)
  const { networkName, error: networkNameErr } = useNetworkName(lotusApiUrl)
  const { networkConnected, error: networkConnectedErr } = useNetworkStatus(
    nodeStatusApiUrl,
    nodeStatusApiKey
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
      <SelectedNetworkWrapper
        onClick={() => {
          setDropdownVisibility(
            dropdownVisibility === 'hidden' ? 'visible' : 'hidden'
          )
        }}
      >
        <StatusIcon color={getStatusColor(success, error)} />
        <span>{connecting ? 'Loading network' : networkName}</span>
        {!connecting ? (
          dropdownVisibility === 'hidden' ? (
            <span>↓</span>
          ) : (
            <span>↑</span>
          )
        ) : (
          <></>
        )}
      </SelectedNetworkWrapper>
      <NetworkOptionsWrapper visibility={dropdownVisibility}>
        {Object.keys(networks)
          .filter(n => !networkName.toUpperCase().includes(n))
          .map((n, i) => (
            <>
              {i > 0 && <hr />}
              <NetworkOption onClick={() => setNetwork(networks[n])} key={n}>
                {n.toLowerCase()}
              </NetworkOption>
            </>
          ))}
      </NetworkOptionsWrapper>
    </Wrapper>
  )
}

export interface NetworkSelectorProps {
  errorCallback?: () => void
}

NetworkSelector.propTypes = {
  errorCallback: PropTypes.func
}
