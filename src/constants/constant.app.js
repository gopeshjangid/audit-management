export const EST_TIMEZONE = "America/New_York";
export const NO_CALL_AUDIT_STATUS = "OPEN"
export const AUDIT_STATUS_VALUE = {
    open: "OPEN",
    inProgress: "IN-PROGRESS",
    pending: "PENDING",
    closed: "CLOSED",
    examinerReview: "EXAMINER-REVIEW",
    reviewComplete: "REVIEW-COMPLETE",
}
export const USER_ROLE = {
  examiner: "EXAMINER",
  auditor: "AUDITOR" 
}
export const RADIO_BUTTON_VALUES = {
    1: {
      backgroundColor: "green",
      transformStyle: "translate(0px)",
      indicator: "Passed",
      labelColor: "success"
    },
    2: {
      backgroundColor: "grey",
      transformStyle: "translate(40px)",
      indicator: "NA",
      labelColor: "secondary"
    },
    3: {
      backgroundColor: "red",
      transformStyle: "translate(80px)",
      indicator: "Failed",
      labelColor: "danger"
    },
  };
  