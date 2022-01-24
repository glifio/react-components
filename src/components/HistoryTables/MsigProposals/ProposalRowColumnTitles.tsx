import { TR, TH } from '../table'

export function ProposalRowColumnTitles() {
  return (
    <thead>
      <TR>
        <TH>ID</TH>
        <TH>Method</TH>
        <TH>Proposer</TH>
        <TH>Value</TH>
        <TH># Approvals</TH>
      </TR>
    </thead>
  )
}
