import styled from 'styled-components'
import PropTypes from 'prop-types'
import { LoadingIcon } from '../Loading/LoadingIcon'

export const Caption = ({
  name,
  loading,
  empty,
  error
}: CaptionProps) => {
  if (error) return <ErrorCaption name={name} error={error} />
  if (loading) return <LoadingCaption />
  if (empty) return <EmptyCaption name={name} />
  return <></>
}

type CaptionProps = {
  name?: string
  loading?: boolean
  empty?: boolean
  error?: Error | string
}

Caption.propTypes = {
  name: PropTypes.string,
  loading: PropTypes.bool,
  empty: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.string])
}

/*
 * EmptyCaption
 */

export const EmptyCaption = ({ name }: EmptyCaptionProps) => (
  <caption>
    No records found {name && `for ${name}`}
  </caption>
)

interface EmptyCaptionProps {
  name?: string
}

EmptyCaption.propTypes = {
  name: PropTypes.string
}

/*
 * ErrorCaption
 */

export const ErrorCaption = ({ name, error }: ErrorCaptionProps) => (
  <caption className='error'>
    {name ? `${name} failed to load: ` : 'Failed to load: '}
    {error instanceof Error ? error.message : error}
  </caption>
)

interface ErrorCaptionProps {
  name?: string
  error: Error | string
}

ErrorCaption.propTypes = {
  name: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.string])
}

/*
 * LoadingCaption
 */

const LoadingCaptionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-l);
`

export const LoadingCaption = () => (
  <caption>
    <LoadingCaptionContent>
      <LoadingIcon size='2em' />
      <span>Loading ...</span>
    </LoadingCaptionContent>
  </caption>
)
