import { func, string, bool, oneOfType } from 'prop-types'
import { forwardRef, useMemo } from 'react'
import BaseInput from './BaseInput'
import Box from '../Box'
import { Label } from '../Typography'
import InputWrapper from './InputWrapper'
import { DenomTag } from './Number'

const TextInput = forwardRef<string, any>(
  ({ denom, value, label, error, disabled, ...props }, ref) => {
    // this allows us to handle controlled and uncontrolled inputs for use with refs
    const inputVal = useMemo(() => {
      if (typeof value === 'string') {
        return value || ''
      } else return undefined
    }, [value])
    return (
      <>
        <InputWrapper>
          <Box display='flex' alignItems='center'>
            {label && (
              <Box
                display='flex'
                justifyContent='flex-start'
                alignItems='center'
                minWidth={6}
                mr={3}
              >
                <Label color='core.nearblack'>{label}</Label>
              </Box>
            )}
            <Box
              position='relative'
              display='flex'
              flex='1'
              alignItems='center'
            >
              <BaseInput
                px={3}
                borderRadius={2}
                value={inputVal}
                disabled={disabled}
                error={error}
                ref={ref}
                {...props}
              />
              {denom && (
                <DenomTag height={7} backgroundColor='core.transparent'>
                  {denom}
                </DenomTag>
              )}
            </Box>
          </Box>
        </InputWrapper>
        {error && (
          <Box textAlign='right' pt={2} mb={0}>
            <Label color='status.fail.background' m={0} textAlign='right'>
              {error}
            </Label>
          </Box>
        )}
      </>
    )
  }
)

TextInput.propTypes = {
  onChange: oneOfType([func]),
  value: oneOfType([string]),
  label: string,
  placeholder: string,
  disabled: bool,
  error: string,
  valid: bool,
  denom: string,
  name: string
}

TextInput.defaultProps = {
  disabled: false,
  label: '',
  denom: '',
  name: ''
}

export default TextInput
