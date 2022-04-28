import { Dialog } from './Dialogs'
import { OneColumnCentered } from './Columns'
import { StandardBox, ShadowBox, InfoBox, WarningBox, ErrorBox } from './Boxes'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = ({ headers, multiline }) => (
  <OneColumnCentered>
    <Dialog>
      <StandardBox>
        <h2>Box Title</h2>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
      </StandardBox>
      <StandardBox>
        {headers && <header>Box Header</header>}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
        {multiline && (
          <>
            <hr />
            <p>
              Donec gravida aliquam tellus ut pulvinar. Pellentesque sit amet
              fringilla nulla. Proin dignissim venenatis turpis sed rutrum.
            </p>
          </>
        )}
      </StandardBox>
      <ShadowBox>
        {headers && <header>Box Header</header>}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
        {multiline && (
          <>
            <hr />
            <p>
              Donec gravida aliquam tellus ut pulvinar. Pellentesque sit amet
              fringilla nulla. Proin dignissim venenatis turpis sed rutrum.
            </p>
          </>
        )}
      </ShadowBox>
      <InfoBox>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
        {multiline && (
          <>
            <hr />
            <p>
              Donec gravida aliquam tellus ut pulvinar. Pellentesque sit amet
              fringilla nulla. Proin dignissim venenatis turpis sed rutrum.
            </p>
          </>
        )}
      </InfoBox>
      <WarningBox>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
        {multiline && (
          <>
            <hr />
            <p>
              Donec gravida aliquam tellus ut pulvinar. Pellentesque sit amet
              fringilla nulla. Proin dignissim venenatis turpis sed rutrum.
            </p>
          </>
        )}
      </WarningBox>
      <ErrorBox>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
          nibh vitae tincidunt ultrices. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas.
        </p>
        {multiline && (
          <>
            <hr />
            <p>
              Donec gravida aliquam tellus ut pulvinar. Pellentesque sit amet
              fringilla nulla. Proin dignissim venenatis turpis sed rutrum.
            </p>
          </>
        )}
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

const Template = args => <StoryComponent {...args} />

export const Base = Template.bind({})
Base.args = {}

export const Headers = Template.bind({})
Headers.args = {
  headers: true
}

export const Multiline = Template.bind({})
Multiline.args = {
  multiline: true
}

export const Everything = Template.bind({})
Everything.args = {
  headers: true,
  multiline: true
}
