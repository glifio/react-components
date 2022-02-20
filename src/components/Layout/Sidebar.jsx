import styled from 'styled-components'
import { space } from '../theme'

export const Wrapper = styled.div`
  display: flex;
  gap: ${space('large')};
  margin: ${space()};
`

export const Sidebar = styled.div`
  flex: 0 0;
`

export const Content = styled.div`
  flex: 1 0;
`
