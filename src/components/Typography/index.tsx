import { forwardRef, ReactNode } from 'react'
import { color, typography, layout, space, border } from 'styled-system'
import styled from 'styled-components'
import { node, oneOf } from 'prop-types'

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

const H4Base = styled.h4`
  ${color}
  ${typography}
  ${layout}
  ${space}
`

export const Label = forwardRef<HTMLLabelElement, TypographyProps>(
  ({ children, ...props }, ref) => (
    <H4Base m={0} ref={ref} {...theme.textStyles.label} {...props}>
      {children}
    </H4Base>
  )
)

Label.propTypes = { children: node }
Label.defaultProps = { children: <></> }

export const Num = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, size, ...props }, ref) => (
    <H2Base ref={ref} {...theme.textStyles.num[size]} {...props}>
      {children}
    </H2Base>
  )
)

Num.propTypes = {
  children: node.isRequired,
  size: oneOf(Object.keys(theme.textStyles.num))
}

export const InputLabelBase = styled.label`
  ${color}
  ${typography}
  ${layout}
  ${space}
`
