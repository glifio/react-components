# @glif/react-components

Shared @glif/react-components!

```
npm install @glif/react-components
```

## Usage

``` jsx
import {
  StandardBox
} from '@glif/react-components'

function Component () {
  return (
    <StandardBox>Hello World</StandardBox>
  )
}
```

### Storybooks

Clone the project locally and run:

```
npm i
npm run storybook
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
