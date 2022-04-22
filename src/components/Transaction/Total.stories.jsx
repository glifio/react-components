import { FilecoinNumber } from '@glif/filecoin-number'
import { Dialog, ShadowBox, OneColumnCentered } from '../Layout'
import { TransactionTotal } from './Total'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = ({ total }) => (
  <OneColumnCentered>
    <Dialog>
      <ShadowBox>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
        <TransactionTotal total={new FilecoinNumber(total, 'fil')} />
      </ShadowBox>
    </Dialog>
  </OneColumnCentered>
)

export default {
  title: 'Transaction/Total',
  component: StoryComponent,
  decorators: [Story => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <StoryComponent {...args} />

export const Base = Template.bind({})
Base.args = {
  total: '123.456'
}
