import PropTypes from 'prop-types'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { theme as defaultTheme } from './theme'

const ThemeProvider = ({ children, theme, ...rest }) => {
  return (
    <StyledThemeProvider theme={theme} {...rest}>
      {children}
    </StyledThemeProvider>
  )
}

ThemeProvider.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node
}

ThemeProvider.defaultProps = {
  theme: defaultTheme,
  children: <></>
}

ThemeProvider.displayName = 'ThemeProvider'

export default ThemeProvider
