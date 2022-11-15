import { FileInput } from './File'
import { Dialog, ShadowBox } from '../Layout'

export default {
  title: 'InputV2/File',
  component: FileInput,
  decorators: [
    Story => (
      <Dialog>
        <ShadowBox>{Story()}</ShadowBox>
      </Dialog>
    )
  ]
}

const onSetFiles = files =>
  console.log(
    files
      ? `Set files: ${Array.from(files)
          .map(f => f.name)
          .join(', ')}`
      : 'Cleared files'
  )
const Template = args => (
  <FileInput {...args} onSetFiles={onSetFiles} autoFocus />
)

export const Base = Template.bind({})
Base.args = {
  label: 'Any file'
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Any file',
  disabled: true
}

export const Error = Template.bind({})
Error.args = {
  label: 'Any file',
  error: 'The file was malformatted'
}

export const Image = Template.bind({})
Image.args = {
  label: 'Image',
  accept: 'image/*'
}

export const MultipleImg = Template.bind({})
MultipleImg.args = {
  label: 'Images',
  accept: 'image/*',
  multiple: true
}

export const Vertical = Template.bind({})
Vertical.args = {
  label: 'Any file',
  vertical: true
}

export const VerticalCentered = Template.bind({})
VerticalCentered.args = {
  label: 'Any file',
  vertical: true,
  centered: true
}

export const VerticalError = Template.bind({})
VerticalError.args = {
  label: 'Any file',
  error: 'The file was malformatted',
  vertical: true
}

export const VerticalCenteredError = Template.bind({})
VerticalCenteredError.args = {
  label: 'Any file',
  error: 'The file was malformatted',
  vertical: true,
  centered: true
}

export const VerticalNoLabel = Template.bind({})
VerticalNoLabel.args = {
  vertical: true
}
