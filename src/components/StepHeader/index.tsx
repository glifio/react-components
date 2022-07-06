import styled from 'styled-components'
import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'

import Stepper from '../Stepper'
import Loading from '../LoaderGlyph'
import Glyph from '../Glyph'
import { Title } from '../Typography'
import Box from '../Box'

type StepHeaderProps = {
  currentStep: number
  glyphAcronym: string
  Icon: ReactNode
  loading: boolean
  totalSteps: number
  showStepper: boolean
  title: string
  error: boolean | string
  [x: string]: any
}

const Menu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-color: silver;
  width: 100%;
`

const MenuItem = styled.li`
  display: flex;
  justify-content: space-between;
`

const StepHeader = ({
  currentStep,
  glyphAcronym,
  Icon,
  loading,
  totalSteps,
  showStepper,
  title,
  error
}: Partial<StepHeaderProps>) => {
  return (
    <Menu>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <MenuItem>
          {error && <Glyph
            acronym='Er'
            backgroundColor='status.fail.background'
            color='status.fail.foreground'
          />}
          {loading && !error && <Loading />}
          {!loading && !error && glyphAcronym && (
            <Glyph Icon={Icon} acronym={glyphAcronym} />
          )}
        </MenuItem>
        <Box width={2} />
        {title && <Title>{title}</Title>}
      </Box>
      {showStepper && (
        <li>
          <Stepper
            textColor={error ? 'status.fail.foreground' : 'core.nearblack'}
            completedDotColor={
              error ? 'status.fail.foreground' : 'status.success.background'
            }
            incompletedDotColor='status.inactive'
            step={currentStep}
            totalSteps={totalSteps}
            ml={4}
            my={0}
          />
        </li>
      )}
    </Menu>
  )
}

StepHeader.propTypes = {
  loading: PropTypes.bool,
  currentStep: PropTypes.number,
  glyphAcronym: PropTypes.string,
  Icon: PropTypes.object,
  totalSteps: PropTypes.number,
  error: PropTypes.bool,
  showStepper: PropTypes.bool,
  title: PropTypes.string
}

StepHeader.defaultProps = {
  loading: false,
  error: false,
  glyphAcronym: '',
  showStepper: true,
  currentStep: 0,
  totalSteps: 0,
  title: ''
}

export default StepHeader
