import { Dialog, OneColumnCentered } from '../Layout'
import { TransactionLoading } from './Loading'

const StoryComponent = ({ description }) => (
  <OneColumnCentered>
    <Dialog>
      <TransactionLoading description={description} />
    </Dialog>
  </OneColumnCentered>
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
