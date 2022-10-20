import PropTypes from 'prop-types'
import styled from 'styled-components'
import Filecoin, { SECP256K1KeyProvider } from '@glif/filecoin-wallet-provider'
import { useState } from 'react'
import { LoginOption } from '../../../../customPropTypes'
import { createWalletProvider, useWalletProvider } from '../../../../services'
import { ButtonV2 } from '../../../Button/V2'
import { InputV2 } from '../../../InputV2'
import { Dialog, ShadowBox, ButtonRowSpaced, ErrorBox } from '../../../Layout'
import { LoadingIcon } from '../../../Loading/LoadingIcon'
import { Loading } from '../../Loading'

const InputsWrapper = styled.span`
  > *:last-child {
    justify-content: center;
  }
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
              const key = isHex
                ? Buffer.from(privateKey, 'hex').toString('base64')
                : privateKey

              const provider = new Filecoin(new SECP256K1KeyProvider(key), {
                apiAddress: lotusApiAddr
              })
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
            <InputsWrapper>
              <InputV2.PrivateKey
                name='private-key'
                label='Please enter your private key below to continue'
                vertical={true}
                centered={true}
                autoFocus={true}
                value={privateKey}
                onChange={setPrivateKey}
                setIsValid={setIsValid}
                isHex={isHex}
              />
              <br />
              <InputV2.Toggle
                label='Hex'
                onChange={() => setIsHex(!isHex)}
                checked={isHex}
              />
            </InputsWrapper>
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
