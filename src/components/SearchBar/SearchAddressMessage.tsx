import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { SearchBar } from '.'
import { isAddress } from '../../utils/isAddress'
import { isTxID } from '../../utils/isTxID'

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
      isAddress(value) || isTxID(value)
        ? ''
        : 'Invalid address, message CID or transaction hash'
    )
  }, [])

  const onSearch = useCallback(
    (value: string) => {
      if (isAddress(value)) return onSearchAddress(value)
      if (isTxID(value)) return onSearchMessage(value)
    },
    [onSearchAddress, onSearchMessage]
  )

  return (
    <SearchBar
      large={large}
      name='search-address-message'
      autoFocus={true}
      autoComplete='on'
      placeholder={'Enter an address, message CID or tx hash'}
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
