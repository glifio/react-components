import styled from 'styled-components'
import PropTypes from 'prop-types'
import { StandardBox } from '../Layout'
import LoaderGlyph from '../LoaderGlyph'
import { space } from '../theme'

const LoadingBox = styled(StandardBox)`
  > *:first-child {
    margin-right: ${space()};
    text-align: left;
    align-self: center;
  }
`

export const TransactionLoading = ({
  description
}: {
  description?: string
}) => {
  return (
    <LoadingBox>
      <LoaderGlyph />
      <p>{description}</p>
    </LoadingBox>
  )
}

TransactionLoading.propTypes = {
  description: PropTypes.string
}

TransactionLoading.defaultProps = {
  description: 'Loading...'
}
