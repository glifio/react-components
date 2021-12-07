import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

import {
  Header as HeaderComp,
  BigTitle as BigTitleComp,
  Title as TitleComp,
  Text as TextComp,
  Label as LabelComp,
  Num as NumComp,
  Highlight as HighlightComp,
  H1 as H1Comp,
  H2 as H2Comp,
  H3 as H3Comp,
  H4 as H4Comp,
  H5 as H5Comp,
  H6 as H6Comp
} from './index'

export default {
  title: 'Typography/Typography',
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

export const Header = args => <HeaderComp {...args} />
Header.args = {
  children: <>Hello world</>
}
Header.component = HeaderComp
Header.title = 'Typography/Header'

export const BigTitle = args => <BigTitleComp {...args} />
BigTitle.args = {
  children: <>Hello world</>
}
BigTitle.component = BigTitleComp
BigTitle.title = 'Typography/BigTitle'

export const Title = args => <TitleComp {...args} />
Title.args = {
  children: <>Hello world</>
}
Title.component = TitleComp
Title.title = 'Typography/Title'

export const Text = args => <TextComp {...args} />
Text.args = {
  children: <>Hello world</>
}
Text.component = TextComp
Text.title = 'Typography/Text'

export const Label = args => <LabelComp {...args} />
Label.args = {
  children: <>Hello world</>
}
Label.component = LabelComp
Label.title = 'Typography/Label'

export const Num = args => <NumComp {...args} />
Num.args = {
  children: <>Hello world</>
}
Num.component = NumComp
Num.title = 'Typography/Num'

export const Highlight = args => <HighlightComp {...args} />
Highlight.args = {
  children: <>Hello world</>,
  fontSize: 16
}
Highlight.component = HighlightComp
Highlight.title = 'Typography/Highlight'

export const H1 = args => <H1Comp {...args}>Test Text</H1Comp>
export const H2 = args => <H2Comp {...args}>Test Text</H2Comp>
export const H3 = args => <H3Comp {...args}>Test Text</H3Comp>
export const H4 = args => <H4Comp {...args}>Test Text</H4Comp>
export const H5 = args => <H5Comp {...args}>Test Text</H5Comp>
export const H6 = args => <H6Comp {...args}>Test Text</H6Comp>
