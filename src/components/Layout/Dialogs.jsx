import styled from 'styled-components'

export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
  width: 100%;
  margin: 0 auto;
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
