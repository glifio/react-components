import styled from 'styled-components'
import { string, func } from 'prop-types'
import { ButtonV2 } from '../ButtonV2'
import { StandardBox } from '../Layout'
import { Colors } from '../theme'

const AccountErrorBox = styled(StandardBox)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 18em;
  height: 18em;
  background-color: ${Colors.RED_LIGHT};
  color: ${Colors.RED_DARK};

  h3 {
    margin-top: 0;
  }

  hr {
    border-color: ${Colors.RED_DARK};
  }

  button {
    color: ${Colors.RED_DARK};
    border-color: ${Colors.RED_DARK};

    &:hover {
      color: ${Colors.WHITE};
      border-color: ${Colors.WHITE};
      background-color: ${Colors.RED_LIGHT};
    }

    &:active {
      color: ${Colors.RED_LIGHT} !important;
      border-color: ${Colors.WHITE} !important;
      background-color: ${Colors.WHITE} !important;
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
