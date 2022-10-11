import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Colors } from '../../../../theme'
import { MnemonicWord } from './MnemonicWord'

enum InputWordState {
  Input = 0,
  Correct,
  Incorrect
}

// Styles need the !important declaration to
// override the base-css text input styles
const InputWordEl = styled.input`
  display: block !important;
  width: 100% !important;
  padding: 0 1em !important;
  border: 2px solid !important;
  border-radius: 1em !important;
  text-align: center !important;

  ${props => {
    switch (props.state) {
      case InputWordState.Correct:
        return css`
          color: ${Colors.WHITE} !important;
          border-color: ${Colors.GREEN_MEDIUM} !important;
          background-color: ${Colors.GREEN_MEDIUM} !important;
        `
      case InputWordState.Incorrect:
        return css`
          color: ${Colors.WHITE} !important;
          border-color: ${Colors.RED_MEDIUM} !important;
          background-color: ${Colors.RED_MEDIUM} !important;
        `
      default:
        return css`
          color: ${Colors.PURPLE_MEDIUM} !important;
          border-color: ${Colors.PURPLE_MEDIUM} !important;
          background-color: ${Colors.PURPLE_LIGHT} !important;
        `
    }
  }}

  &:focus {
    color: ${Colors.PURPLE_MEDIUM} !important;
    border-color: ${Colors.PURPLE_MEDIUM} !important;
    background-color: ${Colors.WHITE} !important;
  }
`

export const InputWord = ({ num, word, onValidChange }: InputWordProps) => {
  const [inputWord, setInputWord] = useState<string>('')
  const [state, setState] = useState<InputWordState>(InputWordState.Input)
  const [valid, setValid] = useState<boolean>(false)

  useEffect(() => setValid(word === inputWord), [word, inputWord])
  useEffect(() => onValidChange(valid), [onValidChange, valid])

  return (
    <MnemonicWord num={num}>
      <InputWordEl
        type='text'
        size={1}
        state={state}
        value={inputWord}
        onChange={e => setInputWord(e.target.value)}
        onFocus={() => setState(InputWordState.Input)}
        onBlur={() =>
          setState(valid ? InputWordState.Correct : InputWordState.Incorrect)
        }
      />
    </MnemonicWord>
  )
}

interface InputWordProps {
  num: number
  word: string
  onValidChange: (valid: boolean) => void
}

InputWord.propTypes = {
  num: PropTypes.number.isRequired,
  word: PropTypes.string.isRequired,
  onValidChange: PropTypes.func.isRequired
}
