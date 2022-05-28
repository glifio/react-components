import Filecoin, { HDWalletProvider } from '@glif/filecoin-wallet-provider'
import React, { useState } from 'react'
import { LoginOption } from '../../../../customPropTypes'
import { createWalletProvider, useWalletProvider } from '../../../../services'
import { ButtonV2 } from '../../../Button/V2'
import { InputV2 } from '../../../InputV2'
import { Dialog, ShadowBox, ButtonRowSpaced } from '../../../Layout'
import LoaderGlyph from '../../../LoaderGlyph'
import { Loading } from '../../Loading'

export default function ImportSeed({
  back,
  next
}: {
  back: () => void
  next: () => void
}) {
  const { dispatch, fetchDefaultWallet, lotusApiAddr, walletList } =
    useWalletProvider()
  const [seed, setSeed] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [importError, setImportError] = useState('')
  return (
    <Dialog>
      <ShadowBox>
        <h2>Import seed phrase</h2>
        <hr />
        <form
          autoComplete='off'
          onSubmit={async e => {
            e.preventDefault()
            setLoading(true)
            if (isValid) {
              try {
                const provider = new Filecoin(new HDWalletProvider(seed), {
                  apiAddress: lotusApiAddr
                })
                dispatch(
                  createWalletProvider(provider, LoginOption.IMPORT_MNEMONIC)
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
            <InputV2.SeedPhrase
              name='seed-phrase'
              label='Please enter your seed phrase below to continue'
              vertical={true}
              centered={true}
              autofocus={true}
              value={seed}
              importError={importError}
              onChange={setSeed}
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
