import { validateAddressString } from '@glif/filecoin-address'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { SearchBar } from '.'
import { validateCID } from '../../utils'

/**
 * SearchAddressMessage
 */
export const SearchAddressMessage = ({
  large,
  buttonText,
  hideErrorMessage,
  onSearchAddress,
  onSearchMessage
}: SearchAddressMessageProps) => {
  const [inputError, setInputError] = useState<string>('')

  const onInput = useCallback((value: string) => {
    setInputError(
      validateAddressString(value) || validateCID(value)
        ? ''
        : 'Invalid address or message CID'
    )
  }, [])

  const onSearch = useCallback(
    (value: string) => {
      if (validateAddressString(value)) return onSearchAddress(value)
      if (validateCID(value)) return onSearchMessage(value)
    },
    [onSearchAddress, onSearchMessage]
  )

  return (
    <SearchBar
      flexBasis='40em'
      large={large}
      name='search-address-message'
      autoFocus={true}
      autoComplete='on'
      placeholder={'Enter an address or message CID'}
      buttonText={buttonText}
      hideErrorMessage={hideErrorMessage}
      inputError={inputError}
      trimInput={true}
      onInput={onInput}
      onSearch={onSearch}
    />
  )
}

export type SearchAddressMessageProps = {
  large?: boolean
  buttonText?: string
  hideErrorMessage?: boolean
  onSearchAddress?: (address: string) => void
  onSearchMessage?: (cid: string) => void
}

SearchAddressMessage.propTypes = {
  large: PropTypes.bool,
  buttonText: PropTypes.string,
  hideErrorMessage: PropTypes.bool,
  onSearchAddress: PropTypes.func,
  onSearchMessage: PropTypes.func
}

SearchAddressMessage.defaultProps = {
  onSearchAddress: () => {},
  onSearchMessage: () => {}
}
