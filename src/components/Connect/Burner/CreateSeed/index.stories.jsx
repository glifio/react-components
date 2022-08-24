import { CreateSeed } from '.'

export default {
  title: 'Connect/CreateSeed',
  component: CreateSeed,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <CreateSeed {...args} />

export const Base = Template.bind({})
Base.args = {
  back: () => console.log('Clicked Back'),
  next: () => console.log('Clicked Next')
}
