import styled from 'styled-components'
import { devices, fontSize, space } from '../theme'

export const OneColumn = styled.div`
  padding: 3rem 1.5rem;

  @media (min-width: ${devices.tablet}) {
    padding: 3rem;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`

export const TwoColumns = styled(OneColumn)`
  display: flex;
  flex-direction: column;
  gap: ${space()};

  @media (min-width: ${devices.tablet}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`

export const OneColumnLargeText = styled(OneColumn)`
  font-size: ${fontSize('large')};

  p {
    max-width: 670px;
    margin: 2em auto;
  }

  &.primary {
    color: white;
    background-color: var(--purple-medium);
    border-radius: 8px;

    a:hover {
      color: white;
    }
  }
`
