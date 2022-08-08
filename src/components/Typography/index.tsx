import { forwardRef, ReactNode } from 'react'
import { color, typography, layout, space, border } from 'styled-system'
import styled from 'styled-components'
import { node } from 'prop-types'

import theme from '../theme'

type TypographyProps = {
  children: ReactNode
  [x: string]: any
}

const H2Base = styled.h2`
  ${color}
  ${typography}
  ${layout}
  ${space}
`

export const Title = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, ...props }, ref) => (
    <H2Base ref={ref} {...theme.textStyles.title} {...props}>
      {children}
    </H2Base>
  )
)

Title.propTypes = { children: node }
Title.defaultProps = { children: <></> }

const TextBase = styled.p`
  ${color}
  ${typography}
  ${layout}
  ${space}
  ${border}
`

export const Text = forwardRef<HTMLParagraphElement, TypographyProps>(
  (props, ref) => {
    return (
      <TextBase ref={ref} {...theme.textStyles.text} {...props}>
        {props.children}
      </TextBase>
    )
  }
)

Text.propTypes = { children: node }
Text.defaultProps = { children: <></> }
