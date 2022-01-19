import { TR, TH } from '../table'

export function MessageRowColumnTitles() {
  return (
    <thead>
      <TR>
        <TH>ID</TH>
        <TH>Method</TH>
        {/* <TH>Age</TH> */}
        <TH>From</TH>
        <TH>To</TH>
        <TH>Value</TH>
        <TH># Approvals</TH>
      </TR>
    </thead>
  )
}
