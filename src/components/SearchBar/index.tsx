import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { Colors, Spaces } from '../theme'

const SearchBarEl = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.SMALL};

  ${props =>
    props.large &&
    css`
      gap: ${Spaces.MEDIUM};
    `}

  form {
    display: flex;
    gap: ${Spaces.MEDIUM};
    width: 100%;
  }
  input[type='search'] {
    flex: 1 0 auto;
  }
  input[type='submit'] {
    flex: 0 1 auto;
    border-radius: 4px;
  }
  span.error {
    color: ${Colors.RED_MEDIUM};
    font-size: 0.875rem;

    ${props =>
      props.large &&
      css`
        font-size: 1rem;
      `}
  }
`

export const SearchBar = ({
  large,
  name,
  autoFocus,
  autoComplete,
  placeholder,
  buttonText,
  inputError,
  hideErrorMessage,
  trimInput,
  onInput,
  onSearch
}: SearchBarProps) => {
  const [value, setValue] = useState<string>('')
  const [hasFocus, setHasFocus] = useState<boolean>(false)

  const showError = useMemo<boolean>(
    () => value && !hasFocus && !!inputError,
    [value, hasFocus, inputError]
  )

  return (
    <SearchBarEl large={large}>
      <form
        onSubmit={async e => {
          e.preventDefault()
          onSearch(value)
        }}
      >
        <input
          className={[
            ...(large ? ['large'] : []),
            ...(showError ? ['error'] : [])
          ].join(' ')}
          name={name}
          type='search'
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={e => {
            const input = trimInput ? e.target.value.trim() : e.target.value
            onInput(input)
            setValue(input)
          }}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
        />
        <input
          className={large ? 'large' : ''}
          disabled={!value || !!inputError}
          type='submit'
          value={buttonText}
        />
      </form>
      {showError && !hideErrorMessage && (
        <span className={'error'}>{inputError}</span>
      )}
    </SearchBarEl>
  )
}

export interface SearchBarProps {
  large?: boolean
  name?: string
  autoFocus?: boolean
  autoComplete?: 'on' | 'off'
  placeholder?: string
  buttonText?: string
  inputError?: string
  hideErrorMessage?: boolean
  trimInput?: boolean
  onInput?: (value: string) => void
  onSearch?: (value: string) => void
}

SearchBar.propTypes = {
  large: PropTypes.bool,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  inputError: PropTypes.string,
  hideErrorMessage: PropTypes.bool,
  trimInput: PropTypes.bool,
  onInput: PropTypes.func,
  onSearch: PropTypes.func
}

SearchBar.defaultProps = {
  large: false,
  name: '',
  autoFocus: true,
  autoComplete: 'on',
  placeholder: '',
  buttonText: 'Search',
  inputError: '',
  hideErrorMessage: false,
  trimInput: false,
  onInput: () => {},
  onSearch: () => {}
}
