import styled, { keyframes } from 'styled-components'

const LoaderGlyphParent = styled.span`
  display: inline-block;
  height: 48px;
  width: 48px;
  text-align: left;
  background-color: var(--purple-medium);
`

const LoaderGlyphAnimation = keyframes`
  20% { transform: translate(0, 0) }
  40% { transform: translate(100%, 0) }
  60% { transform: translate(100%, 100%) }
  80% { transform: translate(0, 100%) }
  100% { transform: translate(0, 0) }
`

const LoaderGlyphChild = styled.span`
  display: inline-block;
  height: 24px;
  width: 24px;
  background-color: var(--purple-dark);
  animation-name: ${LoaderGlyphAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`

export const LoaderGlyph = props => (
  <LoaderGlyphParent {...props}>
    <LoaderGlyphChild />
  </LoaderGlyphParent>
)
