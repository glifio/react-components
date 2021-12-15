import Glyph from '.'

const ErrorGlyph = ({ ...props }) => (
  <Glyph
    {...props}
    acronym='Er'
    backgroundColor='status.fail.background'
    color='status.fail.foreground'
  />
)

export default ErrorGlyph
