import { Caption } from './Captions'

export default {
  title: 'Layout/Caption',
  component: Caption,
  decorators: [Story => (
    <table>
      {Story()}
      <tbody>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </tbody>
    </table>
  )]
}

const Template = args => <Caption {...args} />

export const Loading = Template.bind({})
Loading.args = {
  loading: true
}

export const Error = Template.bind({})
Error.args = {
  error: 'Something went wrong'
}

export const ErrorNamed = Template.bind({})
ErrorNamed.args = {
  name: 'Message History',
  error: 'Something went wrong'
}

export const Empty = Template.bind({})
Empty.args = {
  empty: true
}

export const EmptyNamed = Template.bind({})
EmptyNamed.args = {
  name: 'Message History',
  empty: true
}
