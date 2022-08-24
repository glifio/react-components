import { SmartLink } from '.'

export default {
  title: 'Link/SmartLink',
  component: SmartLink,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => {
  return (
    <>
      <SmartLink {...args}>{args.name}</SmartLink>
    </>
  )
}

export const Base = Template.bind({})
Base.args = {
  href: 'https://google.com',
  name: 'Click here'
}

export const Internal1 = Template.bind({})
Internal1.args = {
  href: '/home',
  name: 'Home'
}

export const Internal2 = Template.bind({})
Internal2.args = {
  href: 'admin',
  name: 'Admin'
}

export const DownloadInternal = Template.bind({})
DownloadInternal.args = {
  href: '/favicon.ico',
  download: true,
  name: 'Download'
}

export const DownloadExternal = Template.bind({})
DownloadExternal.args = {
  href: 'http://localhost:6006/favicon.ico',
  download: true,
  name: 'Download'
}

export const MailTo = Template.bind({})
MailTo.args = {
  href: 'mailto:squad@glif.io',
  name: 'squad@glif.io'
}

export const Tel = Template.bind({})
Tel.args = {
  href: 'tel:+4733378901',
  name: '+4733378901'
}
