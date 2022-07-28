import styled from 'styled-components'
import { devices, fontSize } from '../theme'

export const OneColumn = styled.div`
  position: relative;
  padding: 3rem 1.5rem;

  &:not(:last-child) {
    padding-bottom: 0;
  }

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

export const TwoColumns = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-m);

  @media (min-width: ${devices.tablet}) {
    display: grid;
    align-items: start;
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

export const OneColumnCentered = styled(OneColumn)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Spacer = styled(OneColumn)`
  box-sizing: content-box;

  @media (min-width: ${devices.tablet}) {
    height: 2rem;
  }
`
