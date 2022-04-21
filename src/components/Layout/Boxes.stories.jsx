import { Dialog } from './Dialogs'
import { StandardBox, ShadowBox, InfoBox, WarningBox, ErrorBox } from './Boxes'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = () => (
  <Dialog>
    <StandardBox>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
      nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
      senectus et netus et malesuada fames ac turpis egestas.
    </StandardBox>
    <ShadowBox>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
      nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
      senectus et netus et malesuada fames ac turpis egestas.
    </ShadowBox>
    <InfoBox>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
      nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
      senectus et netus et malesuada fames ac turpis egestas.
    </InfoBox>
    <WarningBox>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
      nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
      senectus et netus et malesuada fames ac turpis egestas.
    </WarningBox>
    <ErrorBox>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
      nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
      senectus et netus et malesuada fames ac turpis egestas.
    </ErrorBox>
  </Dialog>
)

export default {
  title: 'Layout/Boxes',
  component: StoryComponent,
  decorators: [Story => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = () => <StoryComponent />

export const Base = Template.bind({})
