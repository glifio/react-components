import { useState } from 'react'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

import Paginator from './Paginator'

export default {
  title: 'MessageHistory/Paginator',
  component: Paginator,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => {
  const [page, setPage] = useState(args.currentPage)
  return (
    <Paginator
      onPageChange={nextPage => setPage(nextPage)}
      currentPage={page}
      totalPages={args.totalPages}
    />
  )
}

export const FirstPage = Template.bind({})
FirstPage.args = {
  currentPage: 1,
  totalPages: 15
}
