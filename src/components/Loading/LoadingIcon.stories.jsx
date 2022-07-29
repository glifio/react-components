import { LoadingIcon } from './LoadingIcon'

export default {
  title: 'Loading/LoadingIcon',
  component: LoadingIcon,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {Story()}
      </div>
    )
  ]
}

const Template = args => <LoadingIcon {...args} />

export const Base = Template.bind({})
Base.args = {}

export const Small = Template.bind({})
Small.args = { size: '1.5em' }

export const Large = Template.bind({})
Large.args = { size: '5em' }
