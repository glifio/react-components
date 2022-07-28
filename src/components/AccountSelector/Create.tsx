import { CoinType } from '@glif/filecoin-address'
import { Dispatch, SetStateAction, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createPath } from '../../utils'
import { coinTypeCode } from '../../utils/createPath'
import { ButtonV2 } from '../Button/V2'
import { InputV2 } from '../InputV2'
import { Toggle } from '../InputV2/Toggle'
import { ShadowBox } from '../Layout'
import { LoginOption, LOGIN_OPTION_PROPTYPE } from '../../customPropTypes'

const CreateAccountContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: var(--space-m);
  align-items: center;

  > * {
    width: fit-content;

    button {
      width: 38.2%;
      min-width: fit-content;
    }
  }

  > label {
    margin-top: var(--space-m);
  }
`

const FormWrapper = styled(ShadowBox)`
  margin-top: var(--space-m);
`

const Path = styled.p`
  color: var(--gray-medium);
  padding-top: var(--space-m);
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
    margin: var(--space-m);

    label {
      overflow: hidden;
    }
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: var(--red-medium);
    margin-top: var(--space-m);
    margin-bottom: 0;
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

export function CreateAccount({
  fetchNextAccount,
  keyDerive,
  loginOption,
  setError,
  accountIdx: defaultAccountIdx
}: CreateAccountProps) {
  const [expertMode, setExpertMode] = useState(false)
  const [coinTypeOpt, setCoinTypeOpt] = useState<CoinTypeOption>(
    coinTypeToCoinTypeOption(process.env.NEXT_PUBLIC_COIN_TYPE as CoinType)
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
    <CreateAccountContainer>
      <ButtonV2
        large
        onClick={() =>
          fetchNextAccount(
            defaultAccountIdx,
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
          <h3>Create account</h3>
          <Form
            onSubmit={e => {
              e.preventDefault()
              return fetchNextAccount(
                accountIndex,
                coinTypeOptionToCoinType(coinTypeOpt)
              )
            }}
          >
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
            <Path>{path}</Path>
            <ButtonContainer>
              <ButtonV2 green type='submit'>
                Add account
              </ButtonV2>
              {showExport && (
                <p role='button' onClick={exportPrivateKey}>
                  Export private key
                </p>
              )}
            </ButtonContainer>
          </Form>
        </FormWrapper>
      )}
    </CreateAccountContainer>
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
