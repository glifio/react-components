import { FilecoinNumber } from '@glif/filecoin-number'
import { Dialog, ShadowBox, OneColumnCentered } from '../Layout'
import { TransactionBalance } from './Balance'

const StoryComponent = ({ address, balance, msigBalance }) => (
  <OneColumnCentered>
    <Dialog>
      <ShadowBox>
        <TransactionBalance
          address={address}
          balance={new FilecoinNumber(balance, 'fil')}
          msigBalance={msigBalance ? new FilecoinNumber(msigBalance, 'fil') : null}
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
  title: 'Transaction/Balance',
  component: StoryComponent
}

const Template = args => <StoryComponent {...args} />

export const Base = Template.bind({})
Base.args = {
  address: 'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy',
  balance: '2.9302943024234324234234'
}

export const Safe = Template.bind({})
Safe.args = {
  address: 'f2yrhsjwuwypy4gsv2lcikphizkusqe2gp3pp4w5q',
  balance: '2.9302943024234324234234',
  msigBalance: '9.1232130123012310202130'
}
