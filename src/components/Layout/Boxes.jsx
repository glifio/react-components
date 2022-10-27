import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { IconError, IconWarn } from '../Icons'
import { Colors } from '../theme'

/**
 * Box base styling
 */
const BoxBase = styled.div`
  padding: 1.5em;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  word-break: break-word;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  > svg:first-child {
    display: block;
    margin: 0 auto 1em;
  }

  > h2:first-child {
    margin: 0; // Should be followed by <hr />
  }

  header:first-child {
    margin: -1.5em -1.5em 1.5em -1.5em;
    padding: 1.5em;
    background-color: ${Colors.PURPLE_MEDIUM};
    color: ${Colors.WHITE};
  }

  ${props =>
    props.large &&
    css`
      font-size: 1.25em;
    `}
`

BoxBase.propTypes = {
  large: PropTypes.bool
}

BoxBase.defaultProps = {
  large: false
}

/**
 * Standard Box
 */
export const StandardBox = styled(BoxBase)`
  background-color: ${Colors.BLUE_GRAY};
  hr {
    border-color: ${Colors.GRAY_MEDIUM};
  }
`

/**
 * Primary Box
 */
export const PrimaryBox = styled(BoxBase)`
  background-color: ${Colors.PURPLE_MEDIUM};
  color: ${Colors.WHITE};
  hr {
    border-color: ${Colors.WHITE};
  }
`

/**
 * Outline Box
 */
export const OutlineBox = styled(BoxBase)`
  border: 1px solid ${Colors.BLACK};
  hr {
    border-color: ${Colors.BLACK};
  }
`

/**
 * Shadow Box
 */
export const ShadowBox = styled(BoxBase)`
  background-color: ${Colors.WHITE};
  box-shadow: 0 0 0.5em ${Colors.GRAY_LIGHT};
`

/**
 * Info box
 */
export const InfoBox = styled(BoxBase)`
  background-color: ${Colors.GREEN_LIGHT};
  color: ${Colors.GREEN_DARK};
  hr {
    border-color: ${Colors.GREEN_DARK};
  }
`

/**
 * Warning box
 */
const WarningBoxEl = styled(BoxBase)`
  background-color: ${Colors.YELLOW_LIGHT};
  color: ${Colors.YELLOW_DARK};
  hr {
    border-color: ${Colors.YELLOW_DARK};
  }
`

export const WarningBox = ({ children }) => (
  <WarningBoxEl>
    <IconWarn height='1em' />
    {children}
  </WarningBoxEl>
)

/**
 * Error box
 */
const ErrorBoxEl = styled(BoxBase)`
  background-color: ${Colors.RED_LIGHT};
  color: ${Colors.RED_DARK};
  hr {
    border-color: ${Colors.RED_DARK};
  }
`

export const ErrorBox = ({ children }) => (
  <ErrorBoxEl>
    <IconError height='1em' />
    {children}
  </ErrorBoxEl>
)
