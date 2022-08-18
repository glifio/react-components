const getCurrentTimeFormatted = () => {
  const currentTime = new Date()
  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const seconds = currentTime.getSeconds()
  const milliseconds = currentTime.getMilliseconds()
  return `${hours}:${minutes}:${seconds}.${milliseconds}`
}

export const reducerLogger = <T, A>(
  reducer: (state: T, action: A) => T,
  isProd: boolean
): ((state: T, action: A) => T) => {
  if (isProd) {
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
