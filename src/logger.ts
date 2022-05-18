import { Logger, LogLevel } from '@glif/logger'

const IS_PROD: boolean = !!process.env.NEXT_PUBLIC_IS_PROD
const SENTRY_DSN: string = process.env.NEXT_PUBLIC_SENTRY_DSN || ''
const SENTRY_ENV: string = process.env.NEXT_PUBLIC_SENTRY_ENV || ''
const PACKAGE_NAME: string =
  process.env.NEXT_PUBLIC_PACKAGE_NAME || 'react-components'
const PACKAGE_VERSION: string =
  process.env.NEXT_PUBLIC_PACKAGE_VERSION || '?.?.?'

export const logger = new Logger({
  consoleEnabled: true,
  consoleLevel: LogLevel.DEBUG,
  sentryEnabled: IS_PROD,
  sentryLevel: LogLevel.WARN,
  sentryDsn: SENTRY_DSN,
  sentryEnv: SENTRY_ENV,
  sentryTraces: 0,
  packageName: PACKAGE_NAME,
  packageVersion: PACKAGE_VERSION
})

const getCurrentTimeFormatted = () => {
  const currentTime = new Date()
  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const seconds = currentTime.getSeconds()
  const milliseconds = currentTime.getMilliseconds()
  return `${hours}:${minutes}:${seconds}.${milliseconds}`
}

export const reducerLogger = <T, A>(
  reducer: (state: T, action: A) => T
): ((state: T, action: A) => T) => {
  if (process.env.NEXT_PUBLIC_IS_PROD) {
    return reducer
  }
  const reducerWithLogger = (state, action) => {
    const next = reducer(state, action)
    console.group(
      `%cAction: %c${action.type} %cat ${getCurrentTimeFormatted()}`,
      'color: lightgreen; font-weight: bold;',
      'color: white; font-weight: bold;',
      'color: lightblue; font-weight: lighter;'
    )
    console.log('%cPrevious State:', 'color: #9E9E9E; font-weight: 700;', state)
    console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action)
    console.log('%cNext State:', 'color: #47B04B; font-weight: 700;', next)
    console.groupEnd()
    return next
  }

  return reducerWithLogger
}
