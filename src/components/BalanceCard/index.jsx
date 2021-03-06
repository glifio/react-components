import { useState } from 'react'
import { func, bool } from 'prop-types'
import Box from '../Box'
import Button from '../Button'
import { Num, Label } from '../Typography'
import { FILECOIN_NUMBER_PROPTYPE } from '../../customPropTypes'
import makeFriendlyBalance from '../../utils/makeFriendlyBalance'
import ApproximationToggleBtn from './ApproximationToggleBtn'

const BalanceCard = ({ balance, onSend, disableButtons, ...props }) => {
  const [preciseMode, setPreciseMode] = useState(false)
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      width='300px'
      minHeight='300px'
      border={1}
      borderRadius={3}
      p={3}
      bg='card.balance.background'
      {...props}
    >
      <Box display='flex' flexDirection='row' justifyContent='space-between'>
        <Label>Balance</Label>
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
          <ApproximationToggleBtn
            clicked={!preciseMode}
            onClick={() => setPreciseMode(false)}
          >
            Approx.
          </ApproximationToggleBtn>
          <Box width={2} />
          <ApproximationToggleBtn
            clicked={preciseMode}
            onClick={() => setPreciseMode(true)}
          >
            Exact
          </ApproximationToggleBtn>
        </Box>
      </Box>
      <Box overflow='hidden' py={4}>
        <Num css='word-wrap: break-word;' size='xl' color='card.balance.color'>
          {makeFriendlyBalance(balance, 3, !preciseMode)} FIL
        </Num>
        {/* {!converter && !converterError ? (
            <Num size='l' color='core.darkgray'>
              Loading USD
            </Num>
          ) : (
            <Num size='l' color='core.darkgray'>
              {!converterError &&
                `${makeFriendlyBalance(
                  converter.fromFIL(balance.toFil()),
                  2
                )} USD`}
            </Num>
          )} */}
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Button
          variant='primary'
          title='Send'
          disabled={disableButtons}
          onClick={onSend}
          flexGrow='1'
        />
      </Box>
    </Box>
  )
}

BalanceCard.propTypes = {
  /**
   * users balance in Filecoin denom
   */
  balance: FILECOIN_NUMBER_PROPTYPE.isRequired,
  /**
   * action fired when send button is clicked
   */
  onSend: func.isRequired,
  /**
   * determines if the buttons should be disabled or not
   */
  disableButtons: bool
}

BalanceCard.defaultProps = {
  disableButtons: false
}

export default BalanceCard
