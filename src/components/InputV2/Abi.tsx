import { useCallback, useState } from 'react'
import { ABI } from '@glif/filecoin-actor-utils'
import { useAbi, useLogger } from '../../services'
import { ButtonV2 } from '../Button/V2'
import { FileInput } from '../InputV2/File'

export const AbiInput = ({ actorAddress }: UploadABIProps) => {
  const [abi, setAbi, rmAbi] = useAbi(actorAddress)
  const [abiErr, setAbiErr] = useState<DOMException | Error | null>(null)
  const logger = useLogger()

  const handleFileUpload = useCallback(
    e => {
      setAbiErr(null)
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        try {
          let parsedABI = JSON.parse(reader.result as string)
          // handle both json files of _only_ abi, and files with the abi nested under an 'abi' key
          // file is _only_ ABI
          if (Array.isArray(parsedABI)) {
            setAbi(actorAddress, parsedABI as ABI)
          } else if (parsedABI.abi && Array.isArray(parsedABI.abi)) {
            setAbi(actorAddress, parsedABI.abi)
          } else {
            setAbiErr(new Error('Error parsing ABI from uploaded file.'))
          }
        } catch (err) {
          logger.error(err)
          setAbiErr(err)
        }
      }
      reader.onerror = () => {
        rmAbi(actorAddress)
        setAbiErr(reader.error)
      }
    },
    [actorAddress, setAbi, rmAbi, setAbiErr, logger]
  )

  return !abi ? (
    <FileInput
      handleFileUpload={handleFileUpload}
      accept='application/JSON'
      error={abiErr}
    />
  ) : (
    <ButtonV2 onClick={() => rmAbi(actorAddress)}>Reset abi</ButtonV2>
  )
}

type UploadABIProps = {
  actorAddress: string
}
