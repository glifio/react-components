import styled from 'styled-components'

export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
  width: 100%;
  max-width: 35em;

  form {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }
`

export const WideDialog = styled(Dialog)`
  max-width: 50em;
`
