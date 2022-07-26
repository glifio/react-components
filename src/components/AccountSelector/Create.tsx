import { CoinType } from '@glif/filecoin-address'
import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createPath } from '../../utils'
import { coinTypeCode } from '../../utils/createPath'
import { ButtonV2 } from '../Button/V2'
import { InputV2 } from '../InputV2'
import { Toggle } from '../InputV2/Toggle'
import { ShadowBox } from '../Layout'
import { space } from '../theme'

const CreateWalletContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: ${space()};

  align-items: center;

  > * {
    width: fit-content;
  }

  > label {
    margin-top: ${space()};
  }

  > button {
    width: 38.2%;
    min-width: fit-content;
  }
`

const FormWrapper = styled(ShadowBox)`
  margin-top: ${space()};
`

const Path = styled.p`
  color: var(--gray-medium);
  padding-top: ${space()};
`

/**
 * TODO The label child overflow is a hack to get the UI to look right
 * but what really needs to happen is unit-wrapper class should have:
 * `width: fit-content`
 *
 * cant figure out how to get there, and this works pretty well..
 */
const Form = styled.form`
  > * {
    margin: ${space()};
  }

  > label {
    overflow: hidden;
  }
`

enum CoinTypeOption {
  MAINNET = 'Mainnet',
  LEGACY = 'Legacy'
}

const coinTypeToCoinTypeOption = (ct: CoinType) => {
  if (ct === CoinType.TEST) {
    return CoinTypeOption.LEGACY
  }
  return CoinTypeOption.MAINNET
}

const coinTypeOptionToCoinType = (cto: CoinTypeOption) => {
  if (cto === CoinTypeOption.LEGACY) {
    return CoinType.TEST
  }
  return CoinType.MAIN
}

export function CreateWallet({
  fetchNextWallet,
  walletIdx: defaultWalletIdx
}: CreateWalletProps) {
  const [expertMode, setExpertMode] = useState(false)
  const [coinTypeOpt, setCoinTypeOpt] = useState<CoinTypeOption>(
    coinTypeToCoinTypeOption(process.env.NEXT_PUBLIC_COIN_TYPE as CoinType)
  )
  const [walletIndex, setWalletIndex] = useState(defaultWalletIdx)

  const path = isNaN(walletIndex)
    ? ''
    : createPath(
        coinTypeCode(coinTypeOptionToCoinType(coinTypeOpt)),
        walletIndex
      )

  return (
    <CreateWalletContainer>
      <ButtonV2
        large
        onClick={() =>
          fetchNextWallet(
            defaultWalletIdx,
            process.env.NEXT_PUBLIC_COIN_TYPE as CoinType
          )
        }
        disabled={expertMode}
      >
        Next account
      </ButtonV2>
      <Toggle
        label='Expert Mode'
        checked={expertMode}
        onChange={setExpertMode}
      />
      {expertMode && (
        <FormWrapper>
          <h3>Create wallet</h3>
          <Form
            onSubmit={() =>
              fetchNextWallet(
                walletIndex,
                coinTypeOptionToCoinType(coinTypeOpt)
              )
            }
          >
            <InputV2.Select
              label='Coin type'
              options={[CoinTypeOption.MAINNET, CoinTypeOption.LEGACY]}
              value={coinTypeOpt}
              onChange={v => setCoinTypeOpt(v as CoinTypeOption)}
            />
            <InputV2.Number
              label='Wallet index'
              value={walletIndex}
              onChange={setWalletIndex}
            />
            <Path>{path}</Path>
            <ButtonV2 type='submit'>Add wallet</ButtonV2>
          </Form>
        </FormWrapper>
      )}
    </CreateWalletContainer>
  )
}

type CreateWalletProps = {
  fetchNextWallet: (index: number, ct: CoinType) => void
  walletIdx: number
}

CreateWallet.propTypes = {
  fetchNextWallet: PropTypes.func.isRequired,
  walletIdx: PropTypes.number.isRequired
}
