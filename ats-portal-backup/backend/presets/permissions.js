module.exports = {
  Community: {
    can_apply: true,
    can_review: true
  },

  CommunityMember: {
    can_apply: true,
    can_review: true
  },

  Miner: {
    can_apply: true,
    can_insure: true,
    can_fund: true,
    can_review: true
  },

  Supplier: {
    can_supply: true,
    can_review: true
  },

  Insurance: {
    can_insure: true,
    can_review: true
  },

  Bank: {
    can_fund: true,
    can_review: true
  },

  Government: {
    can_approve: true,
    can_review: true,
    can_insure: true,
    can_fund: true
  },

  Transporter: {
    can_transport: true,
    can_review: true
  },

  Landowner: {
    can_allocate_land: true,
    can_sell_land: true,
    can_compensate_land: true,
    can_review: true
  },

  Donor: {
    can_donate: true,
    can_sponsor: true,
    can_support_projects: true,
    can_review: true
  },

  Investor: {
    can_invest: true,
    can_commit_capital: true,
    can_view_investor_dashboard: true,
    can_review: true
  }
};
