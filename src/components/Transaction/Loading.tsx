import PropTypes from 'prop-types'
import { StandardBox } from '../Layout'
import { LoadingIcon } from '../Loading/LoadingIcon'

export const TransactionLoading = ({
  description
}: TransactionLoadingProps) => {
  return (
    <StandardBox>
      <LoadingIcon />
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
