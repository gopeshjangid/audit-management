export const AUDIT_STATUS_OPTION = [
  { label: "OPEN", value: "OPEN" },
  { label: "PENDING", value: "PENDING" },
  { label: "CLOSED", value: "CLOSED" },
];

export const ADDITIONAL_AUDIT_TYPE = [
  { label: "Focused Audit Categories", value: "focusedAuditCategories" },
  { label: "High Dollar Audits", value: "highDollarAudits" },
];

export const ADDITIONAL_AUDIT_SUB_TYPE = {
  "focusedAuditCategories": [  
    { label: "Claim type", value: "claimType" },
    { label: "PAID status", value: "paidStatus" },
  ],
  "highDollarAudits": [
    { label: "Greater than dollar amount", value: "greaterThanDollarAmount" },
    { label: "Date", value: "date" },
  ],
};

export const GROUP_NAME = [
  { label: "RISD", value: "RISD" },
  { label: "Curry", value: "Curry" },
  { label: "STLEN", value: "STLEN" },
  { label: "Paragon", value: "Paragon" },
];

export const EXAMINER_NAME = [
  { label: "L Williams", value: "L Williams" },
  { label: "Brandon DiFabio", value: "Brandon DiFabio" },
  { label: "Cynthia Bridges", value: "Cynthia Bridges" },
  { label: "Melissa Ramirez", value: "Melissa Ramirez" }
]

export const ASSIGNEE_NAME = [
  { label: "Unassigned", value: "Unassigned" },
  { label: "Robin", value: "Robin" },
  { label: "Chaquoyua", value: "Chaquoyua" },
  { label: "David", value: "David" },
  { label: "ROB", value: "ROB" }
]

export const AUDITOR_NAME = [
  { label: "Brandon DiFabio", value: "Brandon DiFabio" },
  { label: "Robin", value: "Robin" },
  { label: "Chaquoyua", value: "Chaquoyua" },
]

export const PAID_STATUS = [
  { label: "PAY", value: "PAY" },
  { label: "PAID", value: "PAID" },
]

export const CLAIM_TYPE = [
  { label: "PROFESSIONAL", value: "1" },
  { label: "INSTITUTIONAL", value: "4" },
]