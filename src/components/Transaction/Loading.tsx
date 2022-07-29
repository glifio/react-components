import PropTypes from 'prop-types'
import { StandardBox } from '../Layout'
import { LoaderGlyph } from '../LoaderGlyph'

export const TransactionLoading = ({
  description
}: TransactionLoadingProps) => {
  return (
    <StandardBox>
      <LoaderGlyph />
      <p>{description}</p>
    </StandardBox>
  )
}

export interface TransactionLoadingProps {
  description?: string
}

TransactionLoading.propTypes = {
  description: PropTypes.string
}

TransactionLoading.defaultProps = {
  description: 'Loading...'
}
