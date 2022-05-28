import Filecoin, { SECP256K1KeyProvider } from '@glif/filecoin-wallet-provider'
import React, { useState } from 'react'
import styled from 'styled-components'
import { LoginOption } from '../../../../customPropTypes'
import { createWalletProvider, useWalletProvider } from '../../../../services'
import { ButtonV2 } from '../../../Button/V2'
import { InputV2 } from '../../../InputV2'
import { Dialog, ShadowBox, ButtonRowSpaced } from '../../../Layout'
import LoaderGlyph from '../../../LoaderGlyph'
import { space } from '../../../theme'

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;

  > * {
    &:first-child {
      margin-bottom: ${space('small')};
    }
  }
`

export default function ImportSeed({
  back,
  next
}: {
  back: () => void
  next: () => void
}) {
  const { dispatch, fetchDefaultWallet, lotusApiAddr, walletList } =
    useWalletProvider()
  const [privateKey, setPrivateKey] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [importError, setImportError] = useState('')
  return (
    <Dialog>
      <ShadowBox>
        <h2>Import private key</h2>
        <hr />
        <form
          autoComplete='off'
          onSubmit={async e => {
            e.preventDefault()
            setLoading(true)
            if (isValid) {
              try {
                const provider = new Filecoin(
                  new SECP256K1KeyProvider(privateKey),
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
          {loading ? (
            <Loading>
              <LoaderGlyph />
              <p>Loading...</p>
            </Loading>
          ) : (
            <InputV2.PrivateKey
              name='private-key'
              label='Please enter your private key below to continue'
              vertical={true}
              centered={true}
              autofocus={true}
              value={privateKey}
              importError={importError}
              onChange={setPrivateKey}
              setIsValid={setIsValid}
            />
          )}

          <ButtonRowSpaced>
            <ButtonV2 large disabled={loading} onClick={back} type='button'>
              Back
            </ButtonV2>
            <ButtonV2 large disabled={loading} green type='submit'>
              Connect
            </ButtonV2>
          </ButtonRowSpaced>
        </form>
      </ShadowBox>
    </Dialog>
  )
}
