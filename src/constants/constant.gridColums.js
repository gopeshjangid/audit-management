import moment from "moment";

export const CLAIM_GRID = [
    {
      title: "Claim Number",
      sortable: true,
      key: "claimNumber",
      render: (value, row, index) => {
        return row.claimNumber;
      },
    },
    {
      title: "Processed Date",
      key: "claimProcessDate",
      sortable: true,
      render: (value, row, index) => {
        return row.claimProcessDate;
      },
    },
    {
      title: "Group",
      key: "groupName",
      sortable: true,
      render: (value, row, index) => {
        return row.groupName;
      },
    },
    {
      title: "Examiner",
      key: "examinerName",
      sortable: true,
      render: (value, row, index) => {
        return row.examinerName;
      },
    },
    {
      title: "Audit Status",
      key: "auditStatus",
      sortable: true,
      render: (value, row, index) => {
        return row.auditStatus;
      },
    },
    {
      title: "Total Charge",
      key: "totalCharge",
      sortable: true,
      className: "text-center",
      render: (value, row, index) => {
        return row.totalCharge;
      },
    },
    {
      sortable: true,
      title: "Total Payment",
      key: "totalPayment",
      className: "text-center",
      //enableServerSideSorting: true,
      render: (value, row, index) => {
        return row.totalPayment;
      },
    },
  ];

  export const ACTION_HISTORY_GRID = [
    {
      title: "Date",
      sortable: true,
      key: "date",
      render: (value, row, index) => {
        return moment(row.date).format("YYYY-MM-DD");
      },
    },
    {
      title: "Performed By",
      key: "user",
      sortable: true,
      render: (value, row, index) => {
        return row.user;
      },
    },
    {
      sortable: true,
      title: "User Role",
      key: "userRole",
      //enableServerSideSorting: true,
      render: (value, row, index) => {
        return row.userRole;
      },
    },
    {
      title: "Assignee",
      key: "assignee",
      sortable: true,
      render: (value, row, index) => {
        return row.assignee;
      },
    },
    {
      title: "Status",
      key: "status",
      sortable: true,
      render: (value, row, index) => {
        return row.status;
      },
    },
    {
      title: "Agree/Disagree",
      key: "agreeDisagree",
      sortable: true,
      render: (value, row, index) => {
        return row.isAgree === null ? "" :  (row.isAgree ? "Agree" : "Disagree" );
      },
    },
    {
      title: "Action notes",
      key: "actionNotes",
      sortable: true,
      render: (value, row, index) => {
        return row.notes;
      },
    },
    
  ];

  

export const REPORT_GRID = [
  {
    title: "Claim Number Audited",
    sortable: true,
    key: "claimNumber",
    render: (value, row, index) => {
      return row.claimNumber;
    },
  },
  {
    title: "Group Name",
    key: "groupName",
    sortable: true,
    render: (value, row, index) => {
      return row.groupName;
    },
  },
  {
    title: "Auditor Name",
    key: "auditorName",
    sortable: true,
    render: (value, row, index) => {
      return row.auditor;
    },
  },
  {
    title: "Date Claim Processed by Examiner",
    key: "dateClaimProcessedbyExaminer",
    sortable: true,
    render: (value, row, index) => {
      return row.claimProcessDate;
    },
  },
  {
    title: "Audited Date",
    key: "auditEndDate",
    sortable: true,
    render: (value, row, index) => {
      return row.auditEndDate;
    },
  },
  {
    title: "# of Errors On Claim",
    key: "ErrorsOnClaim",
    sortable: true,
    render: (value, row, index) => {
      return row.errorCount === null? 0: row.totalErrors;
    },
  },
  {
    title: "Billed Charges",
    key: "billedCharges",
    sortable: true,
    render: (value, row, index) => {
      return row.totalCharge;
    },
  },
  {
    sortable: true,
    title: "Paid Amt of Claim",
    key: "paidAmtofClaim",
    //enableServerSideSorting: true,
    render: (value, row, index) => {
      return row.totalPayment;
    },
  },
  {
    sortable: true,
    title: "Financial Impact if Payment Error",
    key: "financialImpactifPaymentError",
    //enableServerSideSorting: true,
    render: (value, row, index) => {
      return (row.financialAccuracy ??"0")+"%" ;
    },
  },
  {
    sortable: true,
    title: "Error Types",
    key: "errorTypes",
    //enableServerSideSorting: true,
    render: (value, row, index) => {
      const string = row.errorType ?? "";
      return row.errorType === "NO_ERROR" ? "No Error": string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); ;
    },
  },
];
