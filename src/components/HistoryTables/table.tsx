import PropTypes from 'prop-types'
import styled from 'styled-components'

export const TABLE = styled.table`
  min-width: 100%;
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
    table.narrow & {
      padding-right: 1.5rem;
    }
  }

  @media (max-width: 1400px) {
    table.narrow & {
      padding-right: 1rem;
    }
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
    table.narrow & {
      padding-right: 1.5rem;
    }
  }

  @media (max-width: 1400px) {
    table.narrow & {
      padding-right: 1rem;
    }
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

const CAPTION = styled.caption`
  line-height: 1.5em;
  text-align: left;
  caption-side: bottom;
  padding: 1em;
  margin: 0.5em 0;
  color: ${props => props.theme.colors.gray.medium};

  &.error {
    background: ${props => props.theme.colors.red.light};
    color: ${props => props.theme.colors.red.dark};
    border-radius: 4px;
  }
`

export const TableCaption = ({
  name,
  loading,
  empty,
  error
}: TableCaptionProps) => {
  if (error)
    return (
      <CAPTION className='error'>{`${name} failed to load: ${error.message}`}</CAPTION>
    )
  if (loading) return <CAPTION>{`${name} is loading...`}</CAPTION>
  if (empty) return <CAPTION>{`No records found for ${name}`}</CAPTION>
  return <></>
}

type TableCaptionProps = {
  name: string
  loading: boolean
  empty: boolean
  error: Error
}

TableCaption.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  empty: PropTypes.bool.isRequired,
  error: PropTypes.object
}
