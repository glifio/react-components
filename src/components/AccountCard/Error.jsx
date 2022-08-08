import styled from 'styled-components'
import { string, func } from 'prop-types'
import { ButtonV2 } from '../Button/V2'
import { StandardBox } from '../Layout'

const AccountErrorBox = styled(StandardBox)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 18em;
  height: 18em;
  background-color: var(--red-light);
  color: var(--red-dark);

  h3 {
    margin-top: 0;
  }

  hr {
    border-color: var(--red-dark);
  }

  button {
    color: var(--red-dark);
    border-color: var(--red-dark);

    &:hover {
      color: var(--white);
      border-color: var(--white);
      background-color: var(--red-light);
    }

    &:active {
      color: var(--red-light) !important;
      border-color: var(--white) !important;
      background-color: var(--white) !important;
    }
  }
`

export const AccountError = ({ errorMsg, onTryAgain }) => (
  <AccountErrorBox>
    <div>
      <h3>Error</h3>
      <hr />
      <p>{errorMsg}</p>
    </div>
    <ButtonV2 onClick={onTryAgain}>Try again</ButtonV2>
  </AccountErrorBox>
)

AccountError.propTypes = {
  onTryAgain: func.isRequired,
  errorMsg: string
}

AccountError.defaultProps = {
  errorMsg: ''
}
