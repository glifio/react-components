import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { IconWarn } from '../Icons'

/**
 * Box base styling
 */
const BoxBase = styled.div`
  padding: 1.5em;
  border-radius: 8px;
  text-align: center;
  word-break: break-word;

  > svg:first-child {
    display: block;
    margin: 0 auto 1em;
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
`

/**
 * Info box
 */
export const InfoBox = styled(BoxBase)`
  background-color: var(--green-light);
  color: var(--green-dark);
`

/**
 * Warning box
 */
const WarningBoxEl = styled(BoxBase)`
  background-color: var(--yellow-light);
  color: var(--yellow-dark);
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
export const ErrorBox = styled(BoxBase)`
  background-color: var(--red-light);
  color: var(--red-dark);
`
