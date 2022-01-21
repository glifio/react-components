import styled from 'styled-components'

export const TABLE = styled.table`
  border-bottom: 1px solid ${props => props.theme.colors.gray.medium}80;
  border-collapse: collapse;
`

export const TR = styled.tr`
  height: 4.5rem;
  border-top: 1px solid ${props => props.theme.colors.gray.medium}80;
`

export const TH = styled.th`
  color: ${props => props.theme.colors.gray.medium};
  font-size: 1.25rem;
  font-weight: 400;
  text-align: left;
  white-space: nowrap;
  padding-right: 3rem;

  @media (max-width: 1600px) {
    padding-right: 1.5rem;
  }

  @media (max-width: 1400px) {
    padding-right: 1rem;
  }

  &:last-child {
    padding-right: 0;
  }
`

export const TD = styled.td`
  color: ${props => props.theme.colors.gray.dark};
  font-size: 1rem;
  white-space: nowrap;
  padding-right: 3rem;

  @media (max-width: 1600px) {
    padding-right: 1.5rem;
  }

  @media (max-width: 1400px) {
    padding-right: 1rem;
  }

  &:last-child {
    padding-right: 0;
  }

  a {
    color: ${props => props.theme.colors.core.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`
