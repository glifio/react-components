import React from 'react'
import PropTypes from 'prop-types'
import { H2 } from '../Typography'
import Box from '../Box'
import ButtonV2 from '../Button/V2'
import { IconSpeedUp, IconCancel } from '../Icons'

export const Head = ({ title, speedUp, cancel }: HeadProps) => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='space-between'
    gridGap='1em'
    my='1em'
  >
    <H2 color='core.primary' fontSize='1.5rem' margin='0'>
      {title}
    </H2>
    <Box display='flex' gridGap='1rem'>
      {speedUp && (
        <ButtonV2 fontSize='1.5rem'>
          <IconSpeedUp width='1.75rem' />
          Speed up
        </ButtonV2>
      )}
      {cancel && (
        <ButtonV2 fontSize='1.5rem'>
          <IconCancel width='1.25rem' />
          Cancel
        </ButtonV2>
      )}
    </Box>
  </Box>
)

type HeadProps = {
  title: string
  speedUp?: () => void
  cancel?: () => void
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  speedUp: PropTypes.func,
  cancel: PropTypes.func
}

export const Line = ({ label, children }: LineProps) => (
  <Box display='flex' alignItems='center' gridGap='1em' my='1em'>
    <Box minWidth='200px' flex='0 1 25%'>
      {label}
    </Box>
    <Box flex='0 1' display='flex' alignItems='center' gridGap='1em'>
      {children}
    </Box>
  </Box>
)

type LineProps = {
  label: string
  children: React.ReactNode
}

Line.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
