import { Logger } from '@glif/logger'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN! as string
const SENTRY_ENV = process.env.NEXT_PUBLIC_SENTRY_ENV! as string
const ENABLE_SENTRY = process.env.NEXT_PUBLIC_ENABLE_SENTRY! as string

export const logger = new Logger({
  sentryTraces: 0,
  sentryDsn: SENTRY_DSN,
  sentryEnv: SENTRY_ENV,
  sentryEnabled: !!ENABLE_SENTRY,
  packageName: '',
  packageVersion: ''
})
