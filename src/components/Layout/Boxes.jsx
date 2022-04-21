import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { IconWarn, IconError } from '../Icons'

/**
 * Box base styling
 */
const BoxBase = styled.div`
  padding: 1.5em;
  border-radius: 8px;
  text-align: center;
  word-break: break-word;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  > svg:first-child {
    display: block;
    margin: 0 auto 1em;
  }

  > h2:first-child {
    margin: 0; // Should be followed by <hr />
  }

  ${props =>
    props.large &&
    css`
      font-size: 1.25em;
    `}
`

BoxBase.propTypes = {
  large: PropTypes.bool
}

BoxBase.defaultProps = {
  large: false
}

/**
 * Standard Box
 */
export const StandardBox = styled(BoxBase)`
  background-color: var(--blue-gray);
  hr {
    border-color: var(--gray-medium);
  }
`

/**
 * Shadow Box
 */
export const ShadowBox = styled(BoxBase)`
  box-shadow: 0 0 0.5em var(--gray-light);
`

/**
 * Info box
 */
export const InfoBox = styled(BoxBase)`
  background-color: var(--green-light);
  color: var(--green-dark);
  hr {
    border-color: var(--green-dark);
  }
`

/**
 * Warning box
 */
const WarningBoxEl = styled(BoxBase)`
  background-color: var(--yellow-light);
  color: var(--yellow-dark);
  hr {
    border-color: var(--yellow-dark);
  }
`

export const WarningBox = ({ children }) => (
  <WarningBoxEl>
    <IconWarn />
    {children}
  </WarningBoxEl>
)

/**
 * Error box
 */
const ErrorBoxEl = styled(BoxBase)`
  background-color: var(--red-light);
  color: var(--red-dark);
  hr {
    border-color: var(--red-dark);
  }
`

export const ErrorBox = ({ children }) => (
  <ErrorBoxEl>
    <IconError />
    {children}
  </ErrorBoxEl>
)
