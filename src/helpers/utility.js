import _ from "underscore";

export const getOptionValue = (dropdownArr, val) => {
  const optionValue = val ? val.toLowerCase() : "";
  if (dropdownArr) {
    const data = dropdownArr.filter(function (option) {
      return (
        option.value.toLowerCase() === optionValue.toLowerCase() ||
        option.label.toLowerCase() === optionValue.toLowerCase()
      );
    });
    return data.length > 0 ? data[0].label ?? val : val;
  }
  return val;
};

export const getLabelValue = (dropdownArr, val) => {
  if (dropdownArr) {
    const data = dropdownArr.filter(function (option) {
      return option.label.toLowerCase()  === val.toLowerCase() || option.value.toLowerCase() === val.toLowerCase();
    });
    return data.length > 0 ? data[0].value ?? val : val;
  }
  return val;
};

export const verifyEmail = (value) => {
  const isValid =
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? "The email address provided is invalid."
      : false;

      
      //if(!isValid && value.indexOf("@centivo.com", value.length - "@centivo.com".length) !== -1){
    if(!isValid){
        return false
    } else {
      return "The email address provided is invalid."
    }
};

export const verifyPassword = (value) => {
  const error =
    value &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
      value
    )
      ? "Min 8 characters, uppercase, lowercase ,special character and number required"
      : "";
  return error;
};

export const checkValueIsExist = (dropdownArr, val) => {
  if (dropdownArr && dropdownArr.length > 0) {
    const data = dropdownArr.filter(function (option) {
      return option.value.toLowerCase() === val.toLowerCase();
    });
    return data.length === 0;
  }
  return false;
};

export const convertCategoriesSubCategories = (categoriesArr, claimNumber = "") => {
  let data =[];
  if(categoriesArr.length > 0){
    categoriesArr.forEach((val) => {
          data.push({
            
            categoryName: val.categoryName,
            claimNumber: claimNumber,
            indicator: "NA",
            
          });
    
    })
  }
  return data;
}

export const getGroupByCategory = (categoriesSubCategories, claimCategory) => {
  let data = [];
  categoriesSubCategories.forEach((val) => {
    let categoryObj ={}
    const filteredData =  claimCategory.filter(cat => {
      return cat.subCategoryId === val.subCategoryId;
    });
    if(filteredData.length){
      categoryObj = {
        ...categoryObj,
        ...filteredData[0]
      };
    }else{
      categoryObj = {
        ...val,
        indicator: "NA",
      };
    
    }
    data.push(categoryObj);
  });

  data =  _.groupBy(data, x => x.category);
  return data;
} 

export function converApiObjectToQuesryString(requestData) {
  return "?"+Object.entries(requestData).map(e => e.join('=')).join('&');
  
}