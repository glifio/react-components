import styled from 'styled-components'
import BaseInput from './BaseInput'

export const RawNumberInput = styled(BaseInput)`
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`

export default {
  RawNumberInput,
  Base: BaseInput
}
