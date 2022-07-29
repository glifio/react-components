import styled from 'styled-components'
import PropTypes from 'prop-types'
import { LoadingIcon } from '../Loading/LoadingIcon'

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
