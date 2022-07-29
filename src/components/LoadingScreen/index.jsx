import styled from 'styled-components'
import { LoaderGlyph } from '../LoaderGlyph'

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

export const LoadingScreen = props => (
  <LoadingScreenEl>
    <LoaderGlyph />
    <p>Loading...</p>
  </LoadingScreenEl>
)
