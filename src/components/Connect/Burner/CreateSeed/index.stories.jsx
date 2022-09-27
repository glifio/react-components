import { CreateSeed } from '.'

export default {
  title: 'Connect/CreateSeed',
  component: CreateSeed,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <CreateSeed {...args} />

export const Step1 = Template.bind({})
Step1.args = {
  testMnemonic:
    'hen harbor window light knife tuna lunar smooth about apology model win mutual blade indoor process domain exclude decrease bike surge rule arch off',
  initialStep: 1,
  back: () => console.log('Clicked Back'),
  next: () => console.log('Clicked Next')
}

export const Step2 = Template.bind({})
Step2.args = {
  testMnemonic:
    'hen harbor window light knife tuna lunar smooth about apology model win mutual blade indoor process domain exclude decrease bike surge rule arch off',
  initialStep: 2,
  back: () => console.log('Clicked Back'),
  next: () => console.log('Clicked Next')
}

export const Step3 = Template.bind({})
Step3.args = {
  testMnemonic:
    'hen harbor window light knife tuna lunar smooth about apology model win mutual blade indoor process domain exclude decrease bike surge rule arch off',
  initialStep: 3,
  back: () => console.log('Clicked Back'),
  next: () => console.log('Clicked Next')
}
