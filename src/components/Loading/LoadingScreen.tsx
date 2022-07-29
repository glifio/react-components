import styled from 'styled-components'
import { LoadingIcon } from './LoadingIcon'

const LoadingScreenEl = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const LoadingScreen = () => (
  <LoadingScreenEl>
    <LoadingIcon />
    <p>Loading...</p>
  </LoadingScreenEl>
)
