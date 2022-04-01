import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

export const GenericBox = styled.div`
  padding: 1em;
  border-radius: 8px;
  text-align: center;

  ${props =>
    props.large &&
    css`
      font-size: 1.25em;
    `}
`

GenericBox.propTypes = {
  large: PropTypes.bool
}

GenericBox.defaultProps = {
  large: false
}

export const InfoBox = styled(GenericBox)`
  background-color: var(--green-light);
  color: var(--green-dark);
`

export const WarningBox = styled(GenericBox)`
  background-color: var(--yellow-light);
  color: var(--yellow-dark);
`

export const ErrorBox = styled(GenericBox)`
  background-color: var(--red-light);
  color: var(--red-dark);
`
