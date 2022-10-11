import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Colors } from '../../../../theme'
import { MnemonicWord } from './MnemonicWord'

const DisplayWordEl = styled.span`
  display: block;
  padding: 0 1em;
  border-radius: 1em;
  color: ${Colors.WHITE};
  background-color: ${Colors.PURPLE_MEDIUM};
`

export const DisplayWord = ({ num, word }: DisplayWordProps) => {
  return (
    <MnemonicWord num={num}>
      <DisplayWordEl>{word}</DisplayWordEl>
    </MnemonicWord>
  )
}

interface DisplayWordProps {
  num: number
  word: string
}

DisplayWord.propTypes = {
  num: PropTypes.number.isRequired,
  word: PropTypes.string.isRequired
}
