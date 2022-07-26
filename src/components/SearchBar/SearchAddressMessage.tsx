import { validateAddressString } from '@glif/filecoin-address'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import { SearchBar, SearchBarProps } from '.'
import { validateCID } from '../../utils'

/**
 * SearchAddressMessage
 */
export const SearchAddressMessage = ({
  large,
  onSearchAddress,
  onSearchMessage
}: SearchAddressMessageProps) => {
  const [error, setError] = useState<string>('')
  const [hasFocus, setHasFocus] = useState<boolean>(false)

  const onSearch = useCallback((value: string) => {
    setError('')
    if (validateAddressString(value)) {
      onSearchAddress(value)
      return
    }
    if (validateCID(value)) {
      onSearchMessage(value)
      return
    }
    setError('Invalid search term')
  }, [])

  const onFocus = () => {
    setHasFocus(true)
  }

  const onBlur = () => {
    setHasFocus(false)
  }

  return (
    <SearchBar
      large={large}
      error={!hasFocus ? error : ''}
      name='search-address-message'
      autoFocus={true}
      autoComplete='on'
      placeholder={'Enter an address or message CID'}
      onSearch={onSearch}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export type SearchAddressMessageProps = {
  large?: boolean
  onSearchAddress?: (address: string) => void
  onSearchMessage?: (cid: string) => void
}

SearchAddressMessage.propTypes = {
  large: PropTypes.bool,
  onSearchAddress: PropTypes.func,
  onSearchMessage: PropTypes.func
}

 SearchAddressMessage.defaultProps = {
  large: false,
  onSearchAddress: () => {},
  onSearchMessage: () => {}
}
