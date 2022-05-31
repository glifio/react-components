import Filecoin, { HDWalletProvider } from '@glif/filecoin-wallet-provider'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { LoginOption } from '../../../../customPropTypes'
import { createWalletProvider, useWalletProvider } from '../../../../services'
import { ButtonV2 } from '../../../Button/V2'
import { InputV2 } from '../../../InputV2'
import { Dialog, ShadowBox, ButtonRowSpaced, ErrorBox } from '../../../Layout'
import LoaderGlyph from '../../../LoaderGlyph'
import { Loading } from '../../Loading'

export const ImportSeed = ({ back, next }: ImportSeedProps) => {
  const { dispatch, fetchDefaultWallet, lotusApiAddr, walletList } =
    useWalletProvider()
  const [seed, setSeed] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [importError, setImportError] = useState('')
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
        {importError && <ErrorBox>{importError}</ErrorBox>}
        <ShadowBox>
          <h2>Import seed phrase</h2>
          <hr />
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
              autoFocus={true}
              value={seed}
              onChange={setSeed}
              setIsValid={setIsValid}
            />
          )}
        </ShadowBox>
        <ButtonRowSpaced>
          <ButtonV2 large disabled={loading} onClick={back} type='button'>
            Back
          </ButtonV2>
          <ButtonV2 large disabled={loading} green type='submit'>
            Connect
          </ButtonV2>
        </ButtonRowSpaced>
      </form>
    </Dialog>
  )
}

export interface ImportSeedProps {
  back: () => void
  next: () => void
}

ImportSeed.propTypes = {
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
}
