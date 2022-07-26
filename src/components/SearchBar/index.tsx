import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { space } from '../theme'

const SearchBarEl = styled.div`
  form {
    display: flex;
    gap: ${space()};
  }
  input[type='submit'] {
    border-radius: 4px;
  }
`

export const SearchBar = ({
  large,
  name,
  autoFocus,
  autoComplete,
  placeholder,
  inputError,
  onInput,
  onSearch
}: SearchBarProps) => {
  const [value, setValue] = useState<string>('')
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const hasError = useMemo<boolean>(() => !!inputError, [])
  const showError = useMemo<boolean>(() => !hasFocus && hasError, [])

  return (
    <SearchBarEl>
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
            const input = e.target.value.trim()
            onInput(input)
            setValue(input)
          }}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
        />
        <input
          className={large ? 'large' : ''}
          disabled={hasError}
          type='submit'
          value='Search'
        />
      </form>
    </SearchBarEl>
  )
}

export interface SearchBarProps {
  large?: boolean
  name?: string
  autoFocus?: boolean
  autoComplete?: 'on' | 'off'
  placeholder?: string
  inputError?: string
  onInput?: (value: string) => void
  onSearch?: (value: string) => void
}

SearchBar.propTypes = {
  large: PropTypes.bool,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  placeholder: PropTypes.string,
  inputError: PropTypes.string,
  onInput: PropTypes.func,
  onSearch: PropTypes.func
}

SearchBar.defaultProps = {
  large: false,
  name: '',
  autoFocus: true,
  autoComplete: 'on',
  placeholder: '',
  inputError: '',
  onInput: () => {},
  onSearch: () => {}
}
