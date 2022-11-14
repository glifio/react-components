import { ChangeEventHandler } from 'react'

export const FileInput = ({ accept, handleFileUpload }: FileInputProps) => {
  return <input type='file' onChange={handleFileUpload} accept={accept} />
}

type FileInputProps = {
  handleFileUpload: ChangeEventHandler<HTMLInputElement>

  accept?: string
  error?: DOMException | Error | null
}
