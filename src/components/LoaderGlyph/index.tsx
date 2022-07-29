import styled, { keyframes } from 'styled-components'

const LoaderGlyphParent = styled.span`
  display: inline-block;
  height: 48px;
  width: 48px;
  text-align: left;
  background-color: var(--purple-medium);
`

const LoaderGlyphAnimation = keyframes`
 20% { transform:translate(0px, 0px )}
 40% { transform:translate(24px, 0px )}
 60% { transform:translate(24px, 24px )}
 80% { transform:translate(0px, 24px )}
 100% { transform:translate(0px, 0px )}
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

const LoaderGlyph = props => (
  <LoaderGlyphParent {...props}>
    <LoaderGlyphChild />
  </LoaderGlyphParent>
)

export default LoaderGlyph
