import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { MNEMONIC_PROPTYPE } from '../../../../../customPropTypes'
import { ButtonRow } from '../../../../Layout/Buttons'
import { ButtonV2, ButtonV2Link } from '../../../../ButtonV2'
import { InputWord } from '../MnemonicWord/InputWord'
import { DisplayWord } from '../MnemonicWord/DisplayWord'
import { generateRandomWords } from '../generateRandomWords'
import copyToClipboard from '../../../../../utils/copyToClipboard'
import { Spaces } from '../../../../theme'

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MnemonicWords = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${Spaces.LARGE};
`

export const Walkthrough = ({
  mnemonic,
  step,
  onValidChange
}: WalkthroughProps) => {
  const [objectUrl, setObjectUrl] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)
  const [indexes, setIndexes] = useState<Set<number> | null>(null)
  const [valids, setValids] = useState<Map<number, boolean> | null>(null)
  const [allValid, setAllValid] = useState<boolean>(false)

  // Generate download URL
  useEffect(() => {
    const file = new File([mnemonic], 'dontlookhere.txt', {
      type: 'text/plain'
    })
    const objectURL = URL.createObjectURL(file)
    setObjectUrl(objectURL)
  }, [mnemonic])

  // Generate random word indexes
  useEffect(() => {
    setIndexes(step === 2 ? generateRandomWords(mnemonic, 4) : null)
  }, [step, mnemonic])

  // Store valid state per index
  useEffect(() => {
    setValids(
      indexes
        ? new Map<number, boolean>([...indexes].map(i => [i, false]))
        : null
    )
  }, [indexes])

  // Notify parent of valid change
  useEffect(() => onValidChange(allValid), [onValidChange, allValid])

  return (
    <>
      <Title>
        {step === 1 && <h3>Write down your seed phrase somewhere safe.</h3>}
        {step === 2 && <h3>Add the correct words to the empty inputs.</h3>}
        {step === 3 && (
          <h3>Success! Please click &apos;Next&apos; to access your wallet.</h3>
        )}
        <ButtonRow>
          <ButtonV2
            type='button'
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
      <MnemonicWords>
        {mnemonic.split(' ').map((word, i) =>
          valids && indexes?.has(i) ? (
            <InputWord
              key={i}
              num={i + 1}
              word={word}
              onValidChange={valid => {
                valids.set(i, valid)
                setAllValid(valids ? [...valids.values()].every(v => v) : false)
              }}
            />
          ) : (
            <DisplayWord key={i} num={i + 1} word={word} />
          )
        )}
      </MnemonicWords>
    </>
  )
}

interface WalkthroughProps {
  mnemonic: string
  step: number
  onValidChange: (valid: boolean) => void
}

Walkthrough.propTypes = {
  mnemonic: MNEMONIC_PROPTYPE.isRequired,
  step: PropTypes.number.isRequired,
  onValidChange: PropTypes.func.isRequired
}
