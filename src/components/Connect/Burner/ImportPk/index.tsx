import PropTypes from 'prop-types'
import styled from 'styled-components'
import Filecoin, { SECP256K1KeyProvider } from '@glif/filecoin-wallet-provider'
import { useState } from 'react'
import { LoginOption } from '../../../../customPropTypes'
import { createWalletProvider, useWalletProvider } from '../../../../services'
import { ButtonV2 } from '../../../Button/V2'
import { InputV2 } from '../../../InputV2'
import {
  Dialog,
  ShadowBox,
  ButtonRowSpaced,
  ErrorBox,
  Lines
} from '../../../Layout'
import { LoadingIcon } from '../../../Loading/LoadingIcon'
import { Loading } from '../../Loading'

const LabelWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ImportPk = ({ back, next }: ImportPkProps) => {
  const { dispatch, fetchDefaultWallet, lotusApiAddr, walletList } =
    useWalletProvider()
  const [privateKey, setPrivateKey] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [importError, setImportError] = useState('')
  const [isHex, setIsHex] = useState(false)
  return (
    <Dialog>
      <form
        autoComplete='off'
        onSubmit={async e => {
          e.preventDefault()
          setImportError('')
          setLoading(true)
          if (isValid) {
            try {
              const provider = new Filecoin(
                new SECP256K1KeyProvider(privateKey, isHex ? 'hex' : 'base64'),
                {
                  apiAddress: lotusApiAddr
                }
              )
              dispatch(
                createWalletProvider(provider, LoginOption.IMPORT_SINGLE_KEY)
              )
              const wallet = await fetchDefaultWallet(provider)
              walletList([wallet])
              next()
            } catch (err) {
              setImportError(err?.message || JSON.stringify(err))
              setLoading(false)
            }
          }
        }}
      >
        {importError && <ErrorBox>{importError}</ErrorBox>}
        <ShadowBox>
          <h2>Import private key</h2>
          <hr />
          {loading ? (
            <Loading>
              <LoadingIcon />
              <p>Loading...</p>
            </Loading>
          ) : (
            <Lines>
              <LabelWrapper>
                <span>Please enter your private key below to continue</span>
                <InputV2.Toggle
                  label='Hex'
                  onChange={setIsHex}
                  checked={isHex}
                />
              </LabelWrapper>
              <InputV2.PrivateKey
                name='private-key'
                vertical={true}
                centered={true}
                autoFocus={true}
                value={privateKey}
                onChange={setPrivateKey}
                setIsValid={setIsValid}
                isHex={isHex}
              />
            </Lines>
          )}
        </ShadowBox>
        <ButtonRowSpaced>
          <ButtonV2 large disabled={loading} onClick={back} type='button'>
            Back
          </ButtonV2>
          <ButtonV2 large disabled={loading || !isValid} green type='submit'>
            Connect
          </ButtonV2>
        </ButtonRowSpaced>
      </form>
    </Dialog>
  )
}

export interface ImportPkProps {
  back: () => void
  next: () => void
}

ImportPk.propTypes = {
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
}
