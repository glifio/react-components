import { CoinType } from '@glif/filecoin-address'
import { Dispatch, SetStateAction, useState } from 'react'
import PropTypes from 'prop-types'
import { createPath } from '../../utils'
import { coinTypeCode } from '../../utils/createPath'
import { ButtonV2 } from '../Button/V2'
import { InputV2 } from '../InputV2'
import { Toggle } from '../InputV2/Toggle'
import {
  Lines,
  Dialog,
  ShadowBox,
  ButtonRowCenter,
  ButtonRowSpaced
} from '../Layout'
import { LoginOption, LOGIN_OPTION_PROPTYPE } from '../../customPropTypes'
import { useEnvironment } from '../../services/EnvironmentProvider'

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

export function CreateAccount({
  fetchNextAccount,
  keyDerive,
  loginOption,
  setError,
  accountIdx: defaultAccountIdx
}: CreateAccountProps) {
  const { coinType } = useEnvironment()
  const [expertMode, setExpertMode] = useState(false)
  const [coinTypeOpt, setCoinTypeOpt] = useState<CoinTypeOption>(
    coinTypeToCoinTypeOption(coinType)
  )
  const [accountIndex, setAccountIndex] = useState(defaultAccountIdx)

  const path = isNaN(accountIndex)
    ? ''
    : createPath(
        coinTypeCode(coinTypeOptionToCoinType(coinTypeOpt)),
        accountIndex
      )

  const showExport =
    loginOption === LoginOption.CREATE_MNEMONIC ||
    loginOption === LoginOption.IMPORT_MNEMONIC ||
    loginOption === LoginOption.IMPORT_SINGLE_KEY

  const exportPrivateKey = async () => {
    try {
      const blob = new Blob([await keyDerive(path)], {
        type: 'text'
      })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `delete_me.txt`
      link.click()
      link.remove()
    } catch (err) {
      setError(err?.message || JSON.stringify(err))
    }
  }

  return (
    <>
      <ButtonRowSpaced>
        <Toggle
          label='Expert Mode'
          checked={expertMode}
          onChange={setExpertMode}
        />
        <ButtonV2
          large
          onClick={() => fetchNextAccount(defaultAccountIdx, coinType)}
          disabled={expertMode}
        >
          Next account
        </ButtonV2>
      </ButtonRowSpaced>
      {expertMode && (
        <Dialog>
          <form
            onSubmit={e => {
              e.preventDefault()
              fetchNextAccount(
                accountIndex,
                coinTypeOptionToCoinType(coinTypeOpt)
              )
            }}
          >
            <ShadowBox>
              <h3>Create account</h3>
              <hr />
              <Lines>
                <InputV2.Select
                  label='Coin type'
                  options={[CoinTypeOption.MAINNET, CoinTypeOption.LEGACY]}
                  value={coinTypeOpt}
                  onChange={v => setCoinTypeOpt(v as CoinTypeOption)}
                />
                <InputV2.Number
                  label='Account index'
                  value={accountIndex}
                  onChange={setAccountIndex}
                />
                <InputV2.Info label='Path' value={path} />
              </Lines>
              <hr />
              {showExport ? (
                <ButtonRowSpaced>
                  <ButtonV2 gray onClick={exportPrivateKey}>
                    Export private key
                  </ButtonV2>
                  <ButtonV2 green type='submit'>
                    Add account
                  </ButtonV2>
                </ButtonRowSpaced>
              ) : (
                <ButtonRowCenter>
                  <ButtonV2 green type='submit'>
                    Add account
                  </ButtonV2>
                </ButtonRowCenter>
              )}
            </ShadowBox>
          </form>
        </Dialog>
      )}
    </>
  )
}

type CreateAccountProps = {
  accountIdx: number
  loginOption: LoginOption
  keyDerive: (path: string) => Promise<string>
  setError: Dispatch<SetStateAction<string>>
  fetchNextAccount: (index: number, ct: CoinType) => void
}

CreateAccount.propTypes = {
  accountIdx: PropTypes.number.isRequired,
  loginOption: LOGIN_OPTION_PROPTYPE.isRequired,
  keyDerive: PropTypes.func.isRequired,
  fetchNextAccount: PropTypes.func.isRequired
}
