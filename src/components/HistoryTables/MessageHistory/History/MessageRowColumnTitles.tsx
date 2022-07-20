import { bool } from 'prop-types'
import { TR, TH } from '../../../Table'

export function MessageRowColumnTitles({
  displayIncoming
}: {
  displayIncoming: boolean
}) {
  return (
    <thead>
      <TR>
        <TH>CID</TH>
        <TH>Method</TH>
        <TH>Height</TH>
        <TH>Age</TH>
        <TH>From</TH>
        {displayIncoming && <TH></TH>}
        <TH>To</TH>
        <TH>Value</TH>
      </TR>
    </thead>
  )
}

MessageRowColumnTitles.propTypes = {
  displayIncoming: bool
}

MessageRowColumnTitles.defaultProps = {
  displayIncoming: true
}
