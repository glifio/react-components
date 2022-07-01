const { TextDecoder, TextEncoder } = require('util')

global.TextDecoder = TextDecoder
global.TextEncoder = TextEncoder

process.env.NEXT_PUBLIC_COIN_TYPE = 't'

import '@testing-library/jest-dom'
import 'jest-styled-components'
