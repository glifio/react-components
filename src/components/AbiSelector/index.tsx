import { useState } from 'react'
import { ButtonV2 } from '../Button/V2'
import { FileInput } from '../InputV2/File'
import { useAbi } from '../../utils'

export const AbiSelector = ({ address }: AbiSelectorProps) => {
  const { abi, clear, setAbi, error } = useAbi(address)
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
            ? setAbi(parsedAbi)
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
    <ButtonV2 onClick={clear}>Clear ABI</ButtonV2>
  )
}

type AbiSelectorProps = {
  address: string
}
