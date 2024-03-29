import { ProposalHistoryTable } from '.'

export default {
  title: 'ProposalHistory/Table',
  component: ProposalHistoryTable
}

const Template = args => <ProposalHistoryTable {...args} />

export const Base = Template.bind({})
Base.args = {
  msigAddress: 't2i43oi6rnf2s6rp544rcegfbcdp5l62cayz2btmy',
  walletAddress: {
    robust: 't2i43oi6rnf2s6rp544rcegfbcdp5l62cayz2btmy',
    id: 't029519'
  },
  idHref: id => `/#/detail/${id}`,
  approveHref: id => `/#/approve/${id}`,
  cancelHref: id => `/#/cancel/${id}`
}
