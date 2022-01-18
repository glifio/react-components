import { forwardRef, useMemo } from 'react'
import { func, string, bool } from 'prop-types'
import TextInput from './Text'
import Box from '../Box'

const PrivateKey = forwardRef<HTMLInputElement, any>(
  ({ onChange, value, placeholder, error, setError, valid, ...props }, ref) => {
    // this allows us to handle controlled and uncontrolled inputs for use with refs
    const inputVal = useMemo(() => {
      if (typeof value === 'string') {
        return value || ''
      } else return undefined
    }, [value])
    return (
      <Box display='flex' flexDirection='column' alignItems='flex-end'>
        <TextInput
          onFocus={() => {
            if (error) setError('')
          }}
          error={error}
          ref={ref}
          label='Private key'
          onChange={onChange}
          value={inputVal}
          placeholder={placeholder}
          valid={valid}
          width={12}
          type='password'
          {...props}
        />
      </Box>
    )
  }
)

PrivateKey.propTypes = {
  onChange: func,
  value: string,
  setError: func,
  error: string,
  placeholder: string,
  valid: bool
}

PrivateKey.defaultProps = {
  placeholder: 'Your private key',
  setError: () => {}
}

export default PrivateKey
