import { FilecoinNumber } from '@glif/filecoin-number'
import { Dialog, ShadowBox, OneColumnCentered } from '@glif/react-components'
import { TransactionHeader } from './Header'

const StoryComponent = ({ address, balance }) => (
  <OneColumnCentered>
    <Dialog>
      <ShadowBox>
        <TransactionHeader
          address={address}
          balance={new FilecoinNumber(balance, 'fil')}
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
      </ShadowBox>
    </Dialog>
  </OneColumnCentered>
)

export default {
  title: 'Transaction/Header',
  component: StoryComponent
}

const Template = args => <StoryComponent {...args} />

export const Base = Template.bind({})
Base.args = {
  address: 'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy',
  balance: '2.9302943024234324234234'
}
