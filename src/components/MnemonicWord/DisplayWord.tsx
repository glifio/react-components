import styled from 'styled-components'
import { string, number, bool } from 'prop-types'
import Box from '../Box'
import StyledWrapper from './StyledWrapper'
import Circle from './Circle'
import contentProps from './contentProps'

const setBackgroundColor = props => {
  if (props.valid) return 'status.success.background'
  return 'core.primary'
}

const setColor = props => {
  if (props.valid) return 'darkgreen'
  return 'core.white'
}

export const Word = styled(Box).attrs(props => ({
  ...contentProps,
  color: setColor(props)
}))`
  line-height: 2;
`

const DisplayWord = ({ word, num, valid }) => {
  return (
    <StyledWrapper>
      <Circle>{num}</Circle>
      <Word
        valid={valid}
        borderColor={valid ? 'status.success.background' : 'core.primary'}
        backgroundColor={setBackgroundColor({ word, num, valid })}
      >
        {word}
      </Word>
    </StyledWrapper>
  )
}

DisplayWord.propTypes = {
  word: string.isRequired,
  num: number.isRequired,
  valid: bool
}

DisplayWord.defaultProps = {
  valid: false
}

export default DisplayWord
