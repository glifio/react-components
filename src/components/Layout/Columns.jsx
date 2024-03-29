import styled from 'styled-components'
import { Colors, devices, FontSizes, Spaces } from '../theme'

export const OneColumn = styled.div`
  position: relative;
  margin: 3rem 1.5rem;

  @media (min-width: ${devices.tablet}) {
    margin: 3rem;
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
  gap: ${Spaces.MEDIUM};

  @media (min-width: ${devices.tablet}) {
    display: grid;
    align-items: start;
    grid-template-columns: 1fr 1fr;
  }
`

export const OneColumnLargeText = styled(OneColumn)`
  font-size: ${FontSizes.XLARGE};

  p {
    max-width: 670px;
    margin: 2em auto;
  }

  &.primary {
    color: white;
    background-color: ${Colors.PURPLE_MEDIUM};
    border-radius: 8px;

    a:hover {
      color: white;
    }
  }
`

export const OneColumnCentered = styled(OneColumn)`
  height: 100%;
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
