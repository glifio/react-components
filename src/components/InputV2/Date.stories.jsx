import { useState } from 'react'
import { Dialog, ShadowBox } from '../Layout'
import {
  DateInput,
  DateTimeInput,
  MonthInput,
  WeekInput,
  TimeInput
} from './Text'

const StoryComponent = ({ value: defaultValue, Comp, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <Dialog>
      <ShadowBox>
        <Comp value={value} onChange={setValue} autoFocus={true} {...props} />
      </ShadowBox>
    </Dialog>
  )
}

export default {
  title: 'InputV2/Date',
  component: StoryComponent
}

const Template = args => <StoryComponent {...args} />

export const Date = Template.bind({})
Date.args = {
  Comp: DateInput,
  label: 'Enter your date of birth'
}

export const DateTime = Template.bind({})
DateTime.args = {
  Comp: DateTimeInput,
  label: 'Enter your date and time of birth'
}

export const Month = Template.bind({})
Month.args = {
  Comp: MonthInput,
  label: 'Enter your month of birth'
}

export const Week = Template.bind({})
Week.args = {
  Comp: WeekInput,
  label: 'Enter your week of birth'
}

export const Time = Template.bind({})
Time.args = {
  Comp: TimeInput,
  label: 'Enter your time of birth'
}
