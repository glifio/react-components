import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { space } from '../theme'

const SearchBarEl = styled.div`
  form {
    display: flex;
    gap: ${space()};
  }
  input[type=submit] {
    border-radius: 4px;
  }
`

export const SearchBar = ({
  large,
  error,
  name,
  autoFocus,
  autoComplete,
  disabled,
  placeholder,
  onSearch
}: SearchBarProps) => {
  const [value, setValue] = useState<string>('')

  return (
    <SearchBarEl>
      <form
        onSubmit={async e => {
          e.preventDefault()
          onSearch(value.trim())
        }}
      >
        <input
          className={[
            ...(large ? ['large'] : []),
            ...(error ? ['error'] : [])
          ].join(' ')}
          name={name}
          type='search'
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <input
          className={large ? 'large' : ''}
          type='submit'
          disabled={disabled}
          value='Search'
        />
      </form>
    </SearchBarEl>
  )
}

export interface SearchBarProps {
  large?: boolean
  error?: string
  name?: string
  autoFocus?: boolean
  autoComplete?: 'on' | 'off'
  disabled?: boolean
  placeholder?: string
  onSearch?: (value: string) => void
}

SearchBar.propTypes = {
  large: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func
}

SearchBar.defaultProps = {
  large: false,
  error: '',
  name: '',
  autoFocus: true,
  autoComplete: 'on',
  disabled: false,
  placeholder: '',
  onSearch: () => {}
}
