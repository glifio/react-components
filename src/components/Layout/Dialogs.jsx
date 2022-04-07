import styled from 'styled-components'
import { space } from '../theme'

export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space()};
  width: 100%;
  max-width: 35em;

  form {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: ${space()};

    label {
      text-align: left;
    }

    input,
    select {
      text-align: right;
    }
  }
`
