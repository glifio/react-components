import { bool } from 'prop-types'

export function MessageRowColumnTitles({
  displayIncoming
}: {
  displayIncoming: boolean
}) {
  return (
    <thead>
      <tr>
        <th>CID</th>
        <th>Method</th>
        <th>Height</th>
        <th>Age</th>
        <th>From</th>
        {displayIncoming && <th></th>}
        <th>To</th>
        <th>Value</th>
      </tr>
    </thead>
  )
}

MessageRowColumnTitles.propTypes = {
  displayIncoming: bool
}

MessageRowColumnTitles.defaultProps = {
  displayIncoming: true
}
