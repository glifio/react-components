import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { bool } from 'prop-types'
import {
  DisplayWord as Word,
  MnemonicWordContainer
} from '../../../../MnemonicWord'
import { ButtonRow } from '../../../../Layout'
import { ButtonV2, ButtonV2Link } from '../../../../Button/V2'
import { MNEMONIC_PROPTYPE } from '../../../../../customPropTypes'
import copyToClipboard from '../../../../../utils/copyToClipboard'

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Reveal = ({ mnemonic, valid }) => {
  const [objectUrl, setObjectUrl] = useState('')
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    const file = new File([mnemonic], 'dontlookhere.txt', {
      type: 'text/plain'
    })
    const objectURL = URL.createObjectURL(file)
    setObjectUrl(objectURL)
  }, [setObjectUrl, mnemonic])

  return (
    <>
      <Title>
        {valid ? (
          <h3>Success! Please click &apos;Next&apos; to access your wallet.</h3>
        ) : (
          <h3>Write down your seed phrase somewhere safe.</h3>
        )}

        <ButtonRow>
          <ButtonV2
            onClick={() => {
              copyToClipboard(mnemonic)
              setCopied(true)
            }}
          >
            {copied ? 'Copied' : 'Copy'}
          </ButtonV2>
          <ButtonV2Link download='dontlookhere.txt' href={objectUrl}>
            Download
          </ButtonV2Link>
        </ButtonRow>
      </Title>

      <MnemonicWordContainer>
        {mnemonic.split(' ').map((word, i) => (
          <Word key={i} num={i + 1} word={word} valid={valid} />
        ))}
      </MnemonicWordContainer>
    </>
  )
}

Reveal.propTypes = {
  mnemonic: MNEMONIC_PROPTYPE,
  valid: bool
}

Reveal.defaultProps = {
  valid: false
}

export default Reveal
