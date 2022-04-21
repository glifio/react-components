import { Logger, LogLevel } from '@glif/logger'

const IS_PROD: boolean = !!process.env.NEXT_PUBLIC_IS_PROD
const SENTRY_DSN: string = process.env.NEXT_PUBLIC_SENTRY_DSN || ''
const SENTRY_ENV: string = process.env.NEXT_PUBLIC_SENTRY_ENV || ''
const PACKAGE_NAME: string = process.env.NEXT_PUBLIC_PACKAGE_NAME || 'wallet-provider-react'
const PACKAGE_VERSION: string = process.env.NEXT_PUBLIC_PACKAGE_VERSION || '?.?.?'

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
