import { validateAddressString } from '@glif/filecoin-address'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { SearchBar } from '.'

/**
 * SearchAddress
 */
export const SearchAddress = ({
  large,
  buttonText,
  hideErrorMessage,
  onSearch
}: SearchAddressProps) => {
  const [inputError, setInputError] = useState<string>('')

  const onInput = useCallback((value: string) => {
    setInputError(validateAddressString(value) ? '' : 'Invalid address')
  }, [])

  return (
    <SearchBar
      large={large}
      name='search-address-message'
      autoFocus={true}
      autoComplete='on'
      placeholder={'f1...'}
      buttonText={buttonText}
      hideErrorMessage={hideErrorMessage}
      inputError={inputError}
      trimInput={true}
      onInput={onInput}
      onSearch={onSearch}
    />
  )
}

export type SearchAddressProps = {
  large?: boolean
  buttonText?: string
  hideErrorMessage?: boolean
  onSearch?: (address: string) => void
}

SearchAddress.propTypes = {
  large: PropTypes.bool,
  buttonText: PropTypes.string,
  hideErrorMessage: PropTypes.bool,
  onSearch: PropTypes.func
}
