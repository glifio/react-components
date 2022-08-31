import React, { ElementType, ReactNode } from 'react'
import PropTypes from 'prop-types'
import { Logger } from '@glif/logger'
import { ErrorView } from '../ErrorView'
import { OneColumnCentered } from '../Layout'
import { useLogger } from '../../services/EnvironmentProvider'

export const ErrorBoundary = ({
  children,
  Wrapper,
  title,
  description
}: Partial<ErrorBoundaryProps>) => {
  const logger = useLogger()
  return (
    <_ErrorBoundary
      Wrapper={Wrapper}
      logger={logger}
      title={title}
      description={description}
    >
      {children}
    </_ErrorBoundary>
  )
}

// This component catches all uncaught react and syncronous JS errors
// and forwards the user to an error page + sends us the error report
export class _ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.props.logger.error(
      'ErrorBoundary',
      error instanceof Error ? error.message : JSON.stringify(error),
      errorInfo
    )
  }

  render() {
    const { Wrapper } = this.props
    if (this.state.hasError) {
      return (
        <Wrapper>
          <OneColumnCentered>
            <ErrorView
              title={this.props.title}
              description={this.props.description}
            />
          </OneColumnCentered>
        </Wrapper>
      )
    }
    return this.props.children
  }
}

type ErrorBoundaryState = { hasError: boolean }

type ErrorBoundaryProps = {
  Wrapper: ElementType
  children: ReactNode
  logger: Logger
  title: string
  description: string
}

const propTypes = {
  Wrapper: PropTypes.node,
  children: PropTypes.node,
  logger: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string
}

const defaultProps = {
  Wrapper: ({ children }) => <>{children}</>,
  children: <></>,
  logger: null,
  title: 'Glif is currently down',
  description:
    "We've been notified of the outage and expect to be back up and running again shortly."
}

ErrorBoundary.propTypes = propTypes
ErrorBoundary.defaultProps = defaultProps
