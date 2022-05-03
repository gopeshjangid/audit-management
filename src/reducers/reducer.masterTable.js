import * as actionType from "../constants/constant.action";
const defaultState = {
  categoriesSubCategories: [{"subCategoryId":"036154ea-386b-4cd1-a44b-c82f138859g7","subCategory":"Any non-contractual, administrative procedure not followed, e.g., note screen not correctly updated, failure to refer a claim to a higher authority level, follow-up procedures not followed, etc","category":"Administrative Procedure","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"cc84f870-09ea-4a54-a898-bb6c5624a9bb","subCategory":"Benefit code applied is appropriate and paying correctly","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"193791a6-cdd9-4913-b8b2-a6819ca94299","subCategory":"Deductible and coinsurance have been accurately applied","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"ff2134fc-bd88-4286-b4e0-15ef52ff0c05","subCategory":"Plan maximums confirmed and exclusions reviewed","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"f3f369fc-46d4-4222-aace-567216b740d1","subCategory":"Medical necessity has been reviewed","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"82652503-934d-47e4-8af5-288fa2ba56da","subCategory":"Appropriate referrals and/or precertification has been confirmed","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"4540900f-e556-4a90-857f-f46102a0d2f1","subCategory":"Non covered expenses or ineligible services been disallowed","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"40190a04-26e1-4469-a8f2-9451a86f1d7e","subCategory":"Provider selection and demographics are accurate to the claim","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"b2fdbecc-3c86-4354-8714-e5e22e2dd62c","subCategory":"Coding is accurately entered, and applicable edits applied","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"c7abe9d3-14fc-4977-9af9-b915f9a5fe93","subCategory":"Claim has been verified for possible duplicate","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"036154ea-386b-4cd1-a44b-c82f138859g6","subCategory":"Any claim data that was entered into the system incorrectly, e.g., name, address, date of service, amount of charge, etc","category":"Data Entry Error","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"036154ea-386b-4cd1-a44b-c82f138859g8","subCategory":"Failure to obtain necessary documentation, e.g., completed claim form, an operative report, etc","category":"Missing Documentation","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"3364f18f-0933-4dd6-a633-eb1ac299908f","subCategory":"Network Configuaration","category":"Missing Documentation/Department Error","errorType":"NA","status":"1"},{"subCategoryId":"ecaa3c95-4333-4aeb-a1af-b00bdadcd5f4","subCategory":"Benefit Configuaration","category":"Missing Documentation/Department Error","errorType":"NA","status":"1"},{"subCategoryId":"59d97ba6-fc34-46d9-a8e0-86ad793d016f","subCategory":"Account Management/Implementation","category":"Missing Documentation/Department Error","errorType":"NA","status":"1"},{"subCategoryId":"11992c23-278f-4ca3-88e6-f99ff9dbd8d7","subCategory":"Customer Service/MemberCare/ProviderCare","category":"Missing Documentation/Department Error","errorType":"NO_ERROR","status":"1"},{"subCategoryId":"a8db06b0-1414-4144-b8c4-fd881f6efc07","subCategory":"Training","category":"Missing Documentation/Department Error","errorType":"NA","status":"1"},{"subCategoryId":"d895ac4f-62ad-418e-9410-02407a978f03","subCategory":"Claims ","category":"Missing Documentation/Department Error","errorType":"NA","status":"1"},{"subCategoryId":"c40daeae-facc-47ea-ac69-067b9c4abe5e","subCategory":"Charges incurred after the employee's termination date","category":"Patient Eligibility","errorType":"PAYMENT","status":"1"},{"subCategoryId":"4a8a62fb-b75c-4b5a-981e-3b6b7bd264bf","subCategory":"Possible COB has been investigated","category":"Patient Eligibility Verified (Employee/Dependent)","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"6730d704-58f1-4079-850f-0ab0aba9f36c","subCategory":"Dependent meets the definition of covered dependent","category":"Patient Eligibility Verified (Employee/Dependent)","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"fdfdebac-d8dc-4d87-b8b2-fb3ce48b9c46","subCategory":"Services are rendered within effective and term dates of coverage","category":"Patient Eligibility Verified (Employee/Dependent)","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"4d5c1c5c-5f9b-4df8-a009-ae6c01978b68","subCategory":"Possible Subrogation  has been investigated","category":"Patient Eligibility Verified (Employee/Dependent)","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"7ffe130c-6c31-4498-96aa-c255057f0cf4","subCategory":"Appropriate in/out of network benefit level has been applied","category":"Provider Data/Repricing","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"3033396d-777e-4f92-ac1d-9e16ebf7bca0","subCategory":"Out of network provider negotiation has been completed or attempted","category":"Provider Data/Repricing","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"8cfc60d4-c840-4408-b1ef-e5ca2d18d3ff","subCategory":"If a case rate, rate has been applied correctly ","category":"Provider Data/Repricing","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"1e756142-0fec-4a15-8536-5b9e362b1b0e","subCategory":"Providers participation has been confirmed, in-network provider has been priced and discount been accurately applied","category":"Provider Data/Repricing","errorType":"PROCEDURAL","status":"1"}],
  examinerNames: [],
  auditorNames: [],
  allUser: [{ label: "Unassigned", value: "Unassigned" }],
  categoryDropDownValue: [],
  categoryValues: [{"subCategoryId":"036154ea-386b-4cd1-a44b-c82f138859g7","subCategory":"Any non-contractual, administrative procedure not followed, e.g., note screen not correctly updated, failure to refer a claim to a higher authority level, follow-up procedures not followed, etc","category":"Administrative Procedure","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"cc84f870-09ea-4a54-a898-bb6c5624a9bb","subCategory":"Benefit code applied is appropriate and paying correctly","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"193791a6-cdd9-4913-b8b2-a6819ca94299","subCategory":"Deductible and coinsurance have been accurately applied","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"ff2134fc-bd88-4286-b4e0-15ef52ff0c05","subCategory":"Plan maximums confirmed and exclusions reviewed","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"f3f369fc-46d4-4222-aace-567216b740d1","subCategory":"Medical necessity has been reviewed","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"82652503-934d-47e4-8af5-288fa2ba56da","subCategory":"Appropriate referrals and/or precertification has been confirmed","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"4540900f-e556-4a90-857f-f46102a0d2f1","subCategory":"Non covered expenses or ineligible services been disallowed","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"40190a04-26e1-4469-a8f2-9451a86f1d7e","subCategory":"Provider selection and demographics are accurate to the claim","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"b2fdbecc-3c86-4354-8714-e5e22e2dd62c","subCategory":"Coding is accurately entered, and applicable edits applied","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"c7abe9d3-14fc-4977-9af9-b915f9a5fe93","subCategory":"Claim has been verified for possible duplicate","category":"Benefit Application","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"036154ea-386b-4cd1-a44b-c82f138859g6","subCategory":"Any claim data that was entered into the system incorrectly, e.g., name, address, date of service, amount of charge, etc","category":"Data Entry Error","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"036154ea-386b-4cd1-a44b-c82f138859g8","subCategory":"Failure to obtain necessary documentation, e.g., completed claim form, an operative report, etc","category":"Missing Documentation","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"3364f18f-0933-4dd6-a633-eb1ac299908f","subCategory":"Network Configuaration","category":"Missing Documentation/Department Error","errorType":"NA","status":"1"},{"subCategoryId":"ecaa3c95-4333-4aeb-a1af-b00bdadcd5f4","subCategory":"Benefit Configuaration","category":"Missing Documentation/Department Error","errorType":"NA","status":"1"},{"subCategoryId":"59d97ba6-fc34-46d9-a8e0-86ad793d016f","subCategory":"Account Management/Implementation","category":"Missing Documentation/Department Error","errorType":"NA","status":"1"},{"subCategoryId":"11992c23-278f-4ca3-88e6-f99ff9dbd8d7","subCategory":"Customer Service/MemberCare/ProviderCare","category":"Missing Documentation/Department Error","errorType":"NO_ERROR","status":"1"},{"subCategoryId":"a8db06b0-1414-4144-b8c4-fd881f6efc07","subCategory":"Training","category":"Missing Documentation/Department Error","errorType":"NA","status":"1"},{"subCategoryId":"d895ac4f-62ad-418e-9410-02407a978f03","subCategory":"Claims ","category":"Missing Documentation/Department Error","errorType":"NA","status":"1"},{"subCategoryId":"c40daeae-facc-47ea-ac69-067b9c4abe5e","subCategory":"Charges incurred after the employee's termination date","category":"Patient Eligibility","errorType":"PAYMENT","status":"1"},{"subCategoryId":"4a8a62fb-b75c-4b5a-981e-3b6b7bd264bf","subCategory":"Possible COB has been investigated","category":"Patient Eligibility Verified (Employee/Dependent)","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"6730d704-58f1-4079-850f-0ab0aba9f36c","subCategory":"Dependent meets the definition of covered dependent","category":"Patient Eligibility Verified (Employee/Dependent)","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"fdfdebac-d8dc-4d87-b8b2-fb3ce48b9c46","subCategory":"Services are rendered within effective and term dates of coverage","category":"Patient Eligibility Verified (Employee/Dependent)","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"4d5c1c5c-5f9b-4df8-a009-ae6c01978b68","subCategory":"Possible Subrogation  has been investigated","category":"Patient Eligibility Verified (Employee/Dependent)","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"7ffe130c-6c31-4498-96aa-c255057f0cf4","subCategory":"Appropriate in/out of network benefit level has been applied","category":"Provider Data/Repricing","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"3033396d-777e-4f92-ac1d-9e16ebf7bca0","subCategory":"Out of network provider negotiation has been completed or attempted","category":"Provider Data/Repricing","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"8cfc60d4-c840-4408-b1ef-e5ca2d18d3ff","subCategory":"If a case rate, rate has been applied correctly ","category":"Provider Data/Repricing","errorType":"PROCEDURAL","status":"1"},{"subCategoryId":"1e756142-0fec-4a15-8536-5b9e362b1b0e","subCategory":"Providers participation has been confirmed, in-network provider has been priced and discount been accurately applied","category":"Provider Data/Repricing","errorType":"PROCEDURAL","status":"1"}],
  showMessage: "",
  loader: false,
  groupNames: [],
  claimTypes: [],
  auditStatus: [],
  claimStatus:[],
  errorTypes: []
};

const masterTableReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionType.UPDATE_CATEGORIES_SUBCATEGORIES:
      const resultData = action?.payload?.result || [];

      const categoryValues = [];
      let categoryNames = resultData.map((val) => {
        categoryValues.push(val.category);
        return { label: val.category, value: val.category };
      });
      categoryNames.push({ label: "New Category", value: "New Category" });

      return {
        ...state,
        categoriesSubCategories: resultData.map((item) => {
          item.indicator = "NA";
          return item;
        }),
        categoryDropDownValue: categoryNames,
        categoryValues: categoryValues,
      };
    case actionType.UPDATE_EXAMINER_AUDITOR_NAME: 
      console.log(action);
      const examinerNames = [];
      const auditorNames = [];
      const groupNames = [];
      const claimStatus = [];
      const auditStatus  = [];
      const allUser= [{ label: "Unassigned", value: "Unassigned" }];
      action.payload.examiners && action.payload.examiners.forEach(val => {
        examinerNames.push({ label:val, value: val});
      });
      action.payload.auditors && action.payload.auditors.forEach(val => {
        auditorNames.push({ label:val, value: val});
      });
      action.payload.clients && action.payload.clients.forEach(val => {
        groupNames.push({ label:val, value: val});
      });
      action.payload.assignee && action.payload.assignee.forEach(val => {
        allUser.push({ label:val, value: val});
      });
      action.payload.auditStatus && action.payload.auditStatus.forEach(val => {
        auditStatus.push({ label:val, value: val});
      });
      action.payload.claimStatus && action.payload.claimStatus.forEach(val => {
        claimStatus.push({ label:val, value: val});
      });
      return {
        ...state,
        examinerNames,
        auditorNames,
        groupNames,
        allUser,
        claimTypes:action.payload.claimTypes,
        auditStatus,
        claimStatus,
        errorTypes: action.payload.errorTypes
      }
    case actionType.ADD_SUBCAT:
      const result = action.payload;

      const newCategory = {
        ...result,
        category: result.category,
        indicator: "NA",
      };
      const categoriesSubCategories = [
        ...state.categoriesSubCategories,
        newCategory,
      ];
      let newCategoryValues = [];
      let addCatName = [];
      categoriesSubCategories.forEach((val) => {
        if (!newCategoryValues.includes(val.category)) {
          newCategoryValues.push(val.category);
          addCatName.push({ label: val.category, value: val.category });
        }
      });
      addCatName.push({ label: "New Category", value: "New Category" });
      return {
        ...state,
        loader: false,
        categoriesSubCategories: [...categoriesSubCategories],
        categoryDropDownValue: addCatName,
        categoryValues: newCategoryValues,
        showMessage: "Record is Added Successfully",
      };

    case actionType.UPDATE_SUB_CAT:
      const data = action.payload;
      return {
        ...state,
        categoriesSubCategories: state.categoriesSubCategories.map((val) => {
          let updatedVal = {};
          if (val.subCategoryId === data.subCategoryId) {
            updatedVal = {
              ...val,
              subCategory: data.subCategory,
              errorType: data.errorType,
              editFlag : false
            };
          } else {
            updatedVal = {
              ...val,
            };
          }
          return updatedVal;
        }),
        showMessage: "Record is updated successfully",
        loader: false,
      };

    case actionType.DELETE_SUBCAT_SUCCESS:
      const updatedSubcategories = state.categoriesSubCategories.filter(
        (item) => {
          return item.subCategoryId !== action.payload.subCategoryId;
        }
      );
      return {
        ...state,
        showMessage: "Record Deleted Successfully.",
        categoriesSubCategories: [...updatedSubcategories],
        loader: false,
      };
    case actionType.CLEAR_MASTER_REDUCER: 
      return {
        ...defaultState,
      }
    default:
      return state;
  }
};

export default masterTableReducer;
