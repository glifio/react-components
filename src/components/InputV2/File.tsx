import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Label } from './Label'
import { Colors, Spaces } from '../theme'

const FileLabel = styled(Label)`
  .file-wrapper {
    position: relative;
  }

  input {
    position: absolute;
    overflow: hidden;
    opacity: 0;
  }

  .overlay {
    position: relative;
    padding: ${Spaces.LARGE} ${Spaces.XLARGE};
    border-radius: 4px;
    text-align: center;
    color: ${Colors.BLACK};
    background-color: ${Colors.BLUE_LIGHT};
    transition: color 0.1s ease-out, background-color 0.1s ease-out;

    .files {
      display: flex;
      gap: ${Spaces.MEDIUM};

      .list {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: ${Spaces.MEDIUM};
        pointer-events: none;
      }

      .clear {
        flex: 0 1 auto;
        display: flex;
        align-items: center;
        padding: 0 ${Spaces.MEDIUM};
        transition: transform 0.1s ease-out;

        &:hover {
          transform: scale(1.5);
        }
      }
    }

    .drop-text {
      pointer-events: none;
    }

    &:hover,
    &:focus {
      color: ${Colors.BLACK};
      background-color: ${Colors.BLUE_MEDIUM};
    }

    ${props =>
      props.error &&
      css`
        background-color: ${Colors.RED_LIGHT};
        color: ${Colors.RED_DARK};

        &:hover,
        &:focus {
          background-color: ${Colors.RED_MEDIUM};
          color: ${Colors.BLACK};
        }
      `}

    ${props =>
      props.dragOver &&
      css`
        color: ${Colors.WHITE};
        background-color: ${Colors.BLUE_DARK};
      `}

    ${props =>
      props.disabled &&
      css`
        pointer-events: none;
        color: ${Colors.GRAY_DARK};
        background-color: ${Colors.GRAY_LIGHT};
      `}
  }
`

export const FileInput = ({
  label,
  info,
  error,
  dropText,
  vertical,
  centered,
  autoFocus,
  disabled,
  accept,
  multiple,
  onSetFiles
}: FileProps) => {
  const [dragOver, setDragOver] = useState<boolean>(false)
  const [files, setFiles] = useState<FileList | null>(null)

  useEffect(() => onSetFiles(files), [onSetFiles, files])

  return (
    <FileLabel
      error={!!error}
      vertical={vertical}
      centered={centered}
      disabled={disabled}
      dragOver={dragOver}
    >
      {vertical ? (
        <>
          {label && <span>{label}</span>}
          {info && <span className='info'>{info}</span>}
        </>
      ) : (
        <div>
          {label && <span>{label}</span>}
          {info && <span className='info'>{info}</span>}
          {error && <span className='error'>{error}</span>}
        </div>
      )}
      <div
        className='file-wrapper'
        onDrop={e => {
          e.preventDefault()
          setDragOver(false)
          setFiles(e.dataTransfer.files.length ? e.dataTransfer.files : null)
        }}
        onDragOver={e => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => {
          setDragOver(false)
        }}
      >
        <input
          type='file'
          accept={accept}
          multiple={multiple}
          autoFocus={autoFocus}
          disabled={disabled}
          onChange={e =>
            setFiles(e.target.files.length ? e.target.files : null)
          }
        />
        <div className='overlay'>
          {files ? (
            <div className='files'>
              <div className='list'>
                {Array.from(files).map((file: File) => (
                  <span key={file.name}>{file.name}</span>
                ))}
              </div>
              <div
                className='clear'
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  setFiles(null)
                }}
              >
                &#9587;
              </div>
            </div>
          ) : (
            <span className='drop-text'>
              {dropText
                ? dropText
                : `Drop ${multiple ? 'files' : 'a file'} or click to browse`}
            </span>
          )}
        </div>
      </div>
      {vertical && error && <span className='error'>{error}</span>}
    </FileLabel>
  )
}

interface FileProps {
  label?: string
  info?: string
  error?: string
  dropText?: string
  vertical?: boolean
  centered?: boolean
  autoFocus?: boolean
  disabled?: boolean
  accept?: string
  multiple?: boolean
  onSetFiles?: (files: FileList | null) => void
}

FileInput.propTypes = {
  label: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  dropText: PropTypes.string,
  vertical: PropTypes.bool,
  centered: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onSetFiles: PropTypes.func
}

FileInput.defaultProps = {
  label: '',
  info: '',
  error: '',
  dropText: '',
  vertical: false,
  centered: false,
  autoFocus: false,
  disabled: false,
  checked: false,
  accept: '*',
  multiple: false,
  onSetFiles: () => {}
}
