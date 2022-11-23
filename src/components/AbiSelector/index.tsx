import { useState } from 'react'
import styled from 'styled-components'
import { FileInput } from '../InputV2/File'
import { useAbi } from '../../utils/useAbi'
import { Badge } from '../Layout'
import { IconClose } from '../Icons'
import { Colors } from '../theme'

const IconCloseStyled = styled(IconClose)`
  cursor: pointer;
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.25);
  }
`

export const AbiSelector = ({ address }: AbiSelectorProps) => {
  const { abi, abiName, error, setAbi, clearAbi } = useAbi(address)
  const [readError, setReadError] = useState<string | null>(null)

  const onSetFiles = (files: FileList | null) => {
    setReadError(null)
    if (files?.length) {
      const reader = new FileReader()
      reader.readAsText(files[0])
      reader.onerror = () =>
        setReadError(`Failed to read file: ${reader.error.message}`)
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result as string)
          const parsedAbi = parsed.abi ?? parsed
          Array.isArray(parsedAbi)
            ? setAbi(parsedAbi, files[0].name)
            : setReadError('Failed to interpret JSON file as ABI')
        } catch (e) {
          setReadError('Failed to parse file as JSON')
        }
      }
    }
  }

  return error || readError || !abi ? (
    <FileInput
      error={error || readError}
      vertical
      centered
      accept='application/json'
      onSetFiles={onSetFiles}
    />
  ) : (
    <>
      <Badge color='blue' text={abiName} />
      <IconCloseStyled height='1em' color={Colors.BLUE_DARK} onClick={clearAbi} />
    </>
  )
}

type AbiSelectorProps = {
  address: string
}
