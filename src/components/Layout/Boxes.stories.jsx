import { Dialog } from './Dialogs'
import { OneColumnCentered } from './Columns'
import { StandardBox, ShadowBox, InfoBox, WarningBox, ErrorBox } from './Boxes'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = () => (
  <OneColumnCentered>
    <Dialog>
      <StandardBox>
        <h2>Box header</h2>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
      </StandardBox>
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
      <ShadowBox>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
        <hr />
        <p>
          Donec gravida aliquam tellus ut pulvinar. Pellentesque sit amet
          fringilla nulla. Proin dignissim venenatis turpis sed rutrum.
        </p>
      </ShadowBox>
      <InfoBox>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
        nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
        senectus et netus et malesuada fames ac turpis egestas.
      </InfoBox>
      <InfoBox>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
        <hr />
        <p>
          Donec gravida aliquam tellus ut pulvinar. Pellentesque sit amet
          fringilla nulla. Proin dignissim venenatis turpis sed rutrum.
        </p>
      </InfoBox>
      <WarningBox>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
        nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
        senectus et netus et malesuada fames ac turpis egestas.
      </WarningBox>
      <WarningBox>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
        <hr />
        <p>
          Donec gravida aliquam tellus ut pulvinar. Pellentesque sit amet
          fringilla nulla. Proin dignissim venenatis turpis sed rutrum.
        </p>
      </WarningBox>
      <ErrorBox>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
        nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
        senectus et netus et malesuada fames ac turpis egestas.
      </ErrorBox>
      <ErrorBox>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
        <hr />
        <p>
          Donec gravida aliquam tellus ut pulvinar. Pellentesque sit amet
          fringilla nulla. Proin dignissim venenatis turpis sed rutrum.
        </p>
      </ErrorBox>
    </Dialog>
  </OneColumnCentered>
)

export default {
  title: 'Layout/Boxes',
  component: StoryComponent,
  decorators: [Story => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = () => <StoryComponent />

export const Base = Template.bind({})
