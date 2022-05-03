import React from 'react';
import ReactExport from 'react-export-excel';
import moment from 'moment';
import { CLAIM_GRID  } from "../../constants/constant.gridColums";


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ memberReportList, children }) => {
  
  return (
    <ExcelFile
      element={children}
      filename={`Activation Report ${moment(new Date()).format('MMDDYY')}`}
    >
      <ExcelSheet data={memberReportList} name="Report">
        <ExcelColumn label="Member Id" value="employeeCertificateNumber"/>
        <ExcelColumn label="First Name" value="firstName" />
        <ExcelColumn label="Last Name" value="lastName" />
        <ExcelColumn label="Date Of Birth" value ="dateOfBirth"/>
        <ExcelColumn label="Eligibility Type" value = "eligibilityType"/>
        <ExcelColumn label="Member Status" value = "memberStatus"/>
        <ExcelColumn label="Activation Status" value = "complianceFlag"/>
        <ExcelColumn label="Activation Date" value = "startDate"/>
        <ExcelColumn label="Pcp Name" value = "pcpName"/>
        <ExcelColumn label="Pcp Npi" value = "pcpNpi"/>
        <ExcelColumn label="Pcp Specialty" value ="pcpPrimarySpecialty"/>
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
