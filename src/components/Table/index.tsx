import PropTypes from 'prop-types'

export const TableCaption = ({
  name,
  loading,
  empty,
  error
}: TableCaptionProps) => {
  if (error)
    return (
      <caption className='error'>{`${name} failed to load: ${error.message}`}</caption>
    )
  if (loading) return <caption>{`${name} is loading...`}</caption>
  if (empty) return <caption>{`No records found for ${name}`}</caption>
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
