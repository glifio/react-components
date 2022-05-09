import { ThemeProvider } from 'styled-components'
import { Dialog, OneColumnCentered } from '../Layout'
import { TransactionLoading } from './Loading'
import theme from '../theme'

const StoryComponent = ({ description }) => (
  <ThemeProvider theme={theme}>
    <OneColumnCentered>
      <Dialog>
        <TransactionLoading description={description} />
      </Dialog>
    </OneColumnCentered>
  </ThemeProvider>
)

export default {
  title: 'Transaction/Loading',
  component: StoryComponent
}

const Template = args => <StoryComponent {...args} />

export const Base = Template.bind({})
Base.args = {
  description: 'Loading transaction details'
}
