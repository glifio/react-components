import { forwardRef } from 'react'
import styled from 'styled-components'
import { string, object } from 'prop-types'
import { Colors } from '../theme'
import Box from '../Box'

const GlyphText = styled.h3`
  font-family: 'RT-Alias-Medium', 'system-ui', 'Segoe UI', 'Roboto', Helvetica;
  font-weight: 700;
  font-size: 1.5rem;
`

const Glyph = forwardRef<HTMLDivElement, any>(
  ({ acronym, Icon, color, backgroundColor, ...props }, ref) => (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      size={6}
      borderWidth='0.1875rem'
      borderRadius={3}
      borderStyle={0}
      backgroundColor={backgroundColor}
      color={color}
      ref={ref}
      {...props}
    >
      {acronym ? <GlyphText>{acronym}</GlyphText> : <Icon />}
    </Box>
  )
)

Glyph.propTypes = {
  /**
   * The two letters displayed in the glyph
   */
  acronym: string,
  /**
   * This is a dom element, but PropTypes.node was failing
   */
  Icon: object,
  /**
   * The color of the text and border
   */
  color: string,
  backgroundColor: string
}

Glyph.defaultProps = {
  color: Colors.BLACK,
  acronym: ''
}

export default Glyph
