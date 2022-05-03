import React from 'react';
import ReactExport from 'react-export-excel';
import moment from 'moment';
// import { REPORT_GRID  } from "../../constants/constant.gridColums";


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ memberReportList, children }) => {
  
  return (
    <ExcelFile
      element={children}
      filename={`Audit Report ${moment(new Date()).format('MM-DD-YYYY')}`}
    >
      <ExcelSheet data={memberReportList} name="Report">
        <ExcelColumn label="Claim Number Audited" value="claimNumber"/>
        <ExcelColumn label="Group Name" value="groupName" />
        <ExcelColumn label="Auditor Name" value="auditor" />
        <ExcelColumn label="Date Claim Processed by Examiner" value ="claimProcessDate"/>
        <ExcelColumn label="Audited Date" value = "auditEndDate"/>
        <ExcelColumn label="# of Errors On Claim" value={(col) => col.totalErrors === null ? 0 : col.totalErrors}/>
        <ExcelColumn label="Billed Charges" value = "totalCharge"/>
        <ExcelColumn label="Paid Amt of Claim" value = "totalPayment"/>
        <ExcelColumn label="Financial Impact if Payment Error" value={(col) => (col.financialAccuracy ??"0")+"%"}/>
        <ExcelColumn label="Error Types" value={(col) => col.errorType === "NO_ERROR" ? "NO ERROR" : col.errorType}/>
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
