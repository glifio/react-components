import React from 'react'
import { string } from 'prop-types'
import { Text } from '../Typography'
import { StyledATag } from '../Link'

const Help = () => (
  <>
    <Text mt={2}>
      {"Don't see an account you're looking for? "}
      <StyledATag
        fontSize={2}
        ml={2}
        href='https://reading.supply/@glif/not-seeing-the-right-address-when-accessing-the-glif-wallet-NE1FhV'
      >
        Learn More
      </StyledATag>
    </Text>
  </>
)

const HelperText = ({ text }) => {
  return (
    <>
      <Text>{text}</Text>
      <Help />
    </>
  )
}

HelperText.propTypes = {
  text: string.isRequired
}

export default HelperText
