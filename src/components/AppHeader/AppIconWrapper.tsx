import PropTypes from 'prop-types'
import styled from 'styled-components'
import { devices, space } from '../theme'

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${space()};
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.7rem;
  line-height: 1;

  @media (min-width: ${devices.phone}) {
    font-size: 2.1rem;
  }

  @media (min-width: ${devices.tablet}) {
    font-size: 2.5rem;
  }
`

export default function AppIconWrapper(props: AppIconWrapperProps) {
  const { children, title } = props
  return (
    <Wrapper>
      <div>{children}</div>
      <Title>{title}</Title>
    </Wrapper>
  )
}

interface AppIconWrapperProps {
  children: JSX.Element | Array<JSX.Element>
  title: string
}

AppIconWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string.isRequired
}
