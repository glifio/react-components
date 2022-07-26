import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'

const SearchBarEl = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-s);

  ${props =>
    props.large &&
    css`
      gap: var(--space-m);
    `}

  form {
    display: flex;
    gap: var(--space-m);
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
    color: var(--red-medium);
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
  inputError,
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
            const input = e.target.value.trim()
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
          value='Search'
        />
      </form>
      {showError && <span className={'error'}>{inputError}</span>}
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
