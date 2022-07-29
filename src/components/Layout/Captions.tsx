import styled from 'styled-components'
import PropTypes from 'prop-types'
import { LoadingIcon } from '../Loading/LoadingIcon'

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
