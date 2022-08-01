import PropTypes from 'prop-types'

export const ProposalRowColumnTitles = ({
  anyProposalActionRequired
}: ProposalRowColumnTitlesProps) => (
  <thead>
    <tr>
      <th>ID</th>
      <th>Method</th>
      <th>Proposer</th>
      <th>Value</th>
      <th># Approvals</th>
      {anyProposalActionRequired && <th />}
    </tr>
  </thead>
)

interface ProposalRowColumnTitlesProps {
  anyProposalActionRequired?: boolean
}

ProposalRowColumnTitles.propTypes = {
  anyProposalActionRequired: PropTypes.bool
}
