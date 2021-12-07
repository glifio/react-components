import { forwardRef } from 'react'
import { color, typography, layout, space, border } from 'styled-system'
import styled from 'styled-components'
import { node, oneOf, number } from 'prop-types'

import theme, { fontSize } from '../theme'

const H1Base = styled.h1`
  ${color}
  ${typography}
  ${layout}
  ${space}
`

export const Header = forwardRef(({ children, ...props }, ref) => (
  <H1Base ref={ref} {...theme.textStyles.header} {...props}>
    {children}
  </H1Base>
))

Header.propTypes = { children: node.isRequired }

export const BigTitle = forwardRef(({ children, ...props }, ref) => (
  <H1Base ref={ref} {...theme.textStyles.bigTitle} {...props}>
    {children}
  </H1Base>
))

BigTitle.propTypes = { children: node }
BigTitle.defaultProps = { children: <></> }

const H2Base = styled.h2`
  ${color}
  ${typography}
  ${layout}
  ${space}
`

export const Title = forwardRef(({ children, ...props }, ref) => (
  <H2Base ref={ref} {...theme.textStyles.title} {...props}>
    {children}
  </H2Base>
))

Title.propTypes = { children: node }
Title.defaultProps = { children: <></> }

const TextBase = styled.p`
  ${color}
  ${typography}
  ${layout}
  ${space}
  ${border}
`

export const Text = forwardRef((props, ref) => {
  return (
    <TextBase ref={ref} {...theme.textStyles.text} {...props}>
      {props.children}
    </TextBase>
  )
})

Text.propTypes = { children: node }
Text.defaultProps = { children: <></> }

const H4Base = styled.h4`
  ${color}
  ${typography}
  ${layout}
  ${space}
`

export const Label = forwardRef(({ children, ...props }, ref) => (
  <H4Base m={0} ref={ref} {...theme.textStyles.label} {...props}>
    {children}
  </H4Base>
))

Label.propTypes = { children: node }
Label.defaultProps = { children: <></> }

export const Num = forwardRef(({ children, size, ...props }, ref) => (
  <H2Base ref={ref} {...theme.textStyles.num[size]} {...props}>
    {children}
  </H2Base>
))

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

export const Highlight = styled.span`
  border-radius: ${props => props.theme.radii[6]};
  padding: 0rem 1rem;
  margin-right: 0.5rem;
  background-color: #ffc0cb;
  ${typography}
`
Highlight.propTypes = {
  fontSize: number.isRequired
}

const globalHeaderStyles = `
  font-size: ${fontSize('medium')};
  font-weight: 600;
  text-rendering: optimizeLegibility;
  line-height: inherit;
`

export const H1 = styled.h1`
  ${globalHeaderStyles}
`

export const H2 = styled.h2`
  ${globalHeaderStyles}
`

export const H3 = styled.h3`
  ${globalHeaderStyles}
`

export const H4 = styled.h4`
  ${globalHeaderStyles}
`

export const H5 = styled.h5`
  ${globalHeaderStyles}
`

export const H6 = styled.h6`
  ${globalHeaderStyles}
`

export const P = styled.p`
  line-height: 1.3em;

  & + p {
    margin-top: 1em;
  }
`
