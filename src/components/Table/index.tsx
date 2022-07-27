import PropTypes from 'prop-types'
import styled from 'styled-components'

export const CAPTION = styled.caption`
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
