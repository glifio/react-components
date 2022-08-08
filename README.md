# @glif/react-components

Shared @glif/react-components!

```
npm install @glif/react-components
```

## Usage

``` jsx
import {
  Box
} from '@glif/react-components'

function Component () {
  return (
    <Box>Hello World</Box>
  )
}
```

### Storybooks

Clone the project locally and run:

```
npm i
npm run storybook
```

## API

WIP.  In the meantime:

```js
export { default as theme } from './theme'
export { default as ThemeProvider } from './ThemeProvider'

export * from './AccountCard'
export * from './AccountCard/Error'
export * from './BalanceCard'
export { default as Address } from './Address'
export * from './Copy'
export { default as Stepper } from './Stepper'
export { default as Glyph } from './Glyph'
export { default as Box } from './Box'
export { default as MessageHistoryTable } from './MessageHistoryTable'
export * from './Loading/LoadingIcon'
export * from './Loading/LoadingScreen'
export { default as NetworkSwitcherGlyph } from './NetworkSwitcherGlyph'
export { default as StepHeader } from './StepHeader'
export * from './ErrorView'
export { default as Tooltip } from './Tooltip'
export * from './Link'
export * from './Icons'
export * from './MnemonicWord'

export * from './Layout'

export * from './Typography'
```

## FAQ

### Multiple React warnings when linking

Peer dependencies should be resolved to a single instance by your bundler.  In Next.js, you can add the following field to your `next.config.js` config object:

```js
const path = require('path')
const webpack = (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    react: path.resolve('./node_modules/react'),
    'react-dom': path.resolve('./node_modules/react-dom'),
    next: path.resolve('./node_modules/next'),
    'styled-components': path.resolve('./node_modules/styled-components')
  }

  return config;
}

module.exports = {
  webpack
}
```

## License

MIT
