import React, { useState, useEffect, memo, useCallback, useRef } from "react";
import RadioButton from "./radioButton";
import { Alert ,Row , Col } from "reactstrap";
import Button from "@atlaskit/button";
import { connect } from "react-redux";
import { getGroupByCategory } from "../../helpers/utility";
import { RADIO_BUTTON_VALUES } from "../../constants/constant.app";
import { saveClaimCategories } from "../../actions/action.getClaims";
import { Status } from '@atlaskit/avatar';
import SelectALLIndicator from "./selectALLIndicator";

const indicatorValue = {
  "Passed": "1", 
  "NA": "2",
  "Failed": "3"
}

const getIndicatorValue = (subCategoryList) => {
  let indicator = 0;
  if(subCategoryList.length > 0){
    const indicatorNA =  subCategoryList.some(val => val.indicator === "NA")
    if(!indicatorNA) {
      if(subCategoryList.some(val => val.indicator === "Failed")){
        indicator = 1;
      }else{
        indicator = 2;
      }
    }
  }
  return indicator;
}
const GetCategoryStatus = memo(({catName, indicator}) => {
  return (
    <div>
      <div style={{ width: "12px", display: "inline-block", marginLeft: "10px", float: "left", marginRight: "10px"}}>
        {indicator === 1 &&  <Status status="declined" /> }
        {indicator === 2 &&  <Status status="approved" /> }
        {indicator === 0 &&  <span style={{height: "10px", width: "10px", borderRadius: "50%", border: "2px solid white", backgroundColor:"grey", display: "inline-block" }}></span> }
      </div>
      {catName}
    </div>
  )
});

function ShowSaveChecklists(props) {
  const { detailedCategories, savedCategories, noChangeCategory, totalPayment } = props;
  const [categoryList, setCategoryList] = useState(detailedCategories);
  const [subCategory, setSubcategory] = useState([]);
  const [selected, setSelected] = useState("");
  const [changedValue, setChangedValue] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [selectedOption, setSelectedOption] = useState(2)
  const getSubcategory = (key, index) => {
    setSelectedOption(2);
    setSelected(index);
    setSubcategory(key[1]);
  };

  const calculateErrorType = (obj) => {
    const paymentArray = obj.some(val => val.indicator === "Failed" && val.errorType === "PAYMENT");
    if(paymentArray){
      return parseFloat(totalPayment) === 0 || isNaN(parseFloat(totalPayment)) ? "PROCEDURAL" : "PAYMENT";
    }else{
      const proceduralArray = obj.some(val => val.indicator === "Failed" && val.errorType === "PROCEDURAL");
      if(proceduralArray){
        return "PROCEDURAL"
      }else{
        return "NO_ERROR";
      }
    }
  }

  const getUpdatedCategories = (claimCategory, updatedCategory) => {
    updatedCategory.forEach(val => {
      const i = claimCategory.findIndex(_item => _item.subCategoryId === val.subCategoryId);
      if (i > -1) claimCategory[i] = val;
      else claimCategory.push(val);
    });
    return claimCategory;
  }

  const handleChangedValue = useCallback((val) => {
    let flag = true;
    let data = changedValue.map(value => {
      if(val.category === value.category && val.subCategory === value.subCategory) {
        value.indicator = val.indicator ;
        flag = false;
      }
      return value;
    });
    if(flag){
      data.push(val)
    }
    setChangedValue(data);
  },[changedValue])
  

  const handleOptionValue = useCallback( (e, key) => {
    let color = RADIO_BUTTON_VALUES[e]["labelColor"];
    let data = subCategory.map((cat) => {
      if (cat.subCategoryId === key) {
        cat.color = color;
        cat.indicator =RADIO_BUTTON_VALUES[e]["indicator"]; 
      }
      return cat;
    });
    setShowButton(true);
    setSubcategory(data);
  },[subCategory]);

  const updateCategoryIndicatorValues = (e) => {
    let catVal = JSON.parse(JSON.stringify(changedValue));
    let color = RADIO_BUTTON_VALUES[e]["labelColor"];
    let data = subCategory.map((cat) => {
      let flag = true;
      cat.indicator =RADIO_BUTTON_VALUES[e]["indicator"];
      cat.color = color; 
      catVal = catVal.map(value => {
        if(cat.category === value.category && cat.subCategory === value.subCategory) {
          value.indicator = cat.indicator ;
          flag = false;
        }
        return value;
      });
      if(flag){
        catVal.push(cat);
      }
      return cat;
    });
    setSelectedOption(e);
    setChangedValue(catVal);
    setShowButton(true);
    setSubcategory(data);
  }

  const handleSubCategories = async (value) => {
    const data = getUpdatedCategories(savedCategories, value);
    let calculatedErrorType = calculateErrorType(data);
    const updateData = data.map(val => {
      const {subCategoryId, indicator} = val
      return { subCategoryId, indicator }
    });
    await props.saveClaimCategories({ errorType: calculatedErrorType, categories: updateData, claimNumber: props.claimNumber, user: localStorage.getItem("userName"), userRole: localStorage.getItem("userType")});
    await props.scrollToMyRef(true, calculatedErrorType);
  }

  const saveCategory = async (changedCat) => {
    await handleSubCategories(changedCat);
    setChangedValue([]);
    setShowButton(false);
  }

  const cancelButton = () => {
    setCategoryList(JSON.parse(JSON.stringify(noChangeCategory)));
    setShowButton(false);
    props.scrollToMyRef(false);
  }

  useEffect(() => {
    let data = Object.entries(categoryList);
    if (Object.keys(data).length) {
      setSubcategory(data[0][1]);
      setSelected(0);
    }
  }, [categoryList]);

 

  return (
    <>
    <Row>
      <Col sm={12} style={{textAlign :'right'}}>
        <SelectALLIndicator  updateCategoryIndicatorValues={updateCategoryIndicatorValues} selectedOption={selectedOption}/>
      </Col>
    </Row>
      
      <div className="mainRow">
        <div className="category categoryBox">
          <ul className="categoryList">
            {Object.entries(categoryList).map((key, i) => {
              const indicator = getIndicatorValue(key[1]);
              let index = 0;
              const selectedClassName = selected === i ? "categoryName selected" : "categoryName"
              return (
                <li
                  className={selectedClassName}
                  onClick={() => getSubcategory(key, i)}
                  key={"tr" + key[0]+ index}
                >
                  <GetCategoryStatus catName={key[0]} indicator={indicator} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="subcategory">
          <div className="subcategoryBox">
            {subCategory.map((val, key) => {
              return (
                <div className="subcategoryList" key={val.subCategory+key}>
                  <Alert
                    className="subcategoryLabel"
                    color={val.color || "primary"}
                  >
                    {val.subCategory}
                  </Alert>
                  <RadioButton
                    id={val.subCategoryId}
                    index={val.subCategoryId}
                    selectedOption={indicatorValue[val.indicator]}
                    handleChangedValue={handleChangedValue}
                    catData={{ ...val }}
                    keu={"radio"+val.subCategoryId}
                    handleOptionValue={(e) => handleOptionValue(e, val.subCategoryId)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {showButton && (<div className="buttonDiv">
        <Button appearance="primary" className="saveButton" onClick={() => saveCategory(changedValue)}>Save</Button>
        <Button onClick={() => cancelButton()}>Cancel</Button>
      </div>)}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  saveClaimCategories: (data) => dispatch(saveClaimCategories(data)),
});

const mapStateToProps = (state) => {
  const claimCategories = state.getClaims
    ? state.getClaims?.selectedClaims?.detailedCategories
    : [];
  const groupByCategory = getGroupByCategory(
    state.masterTable.categoriesSubCategories,
    claimCategories,
  );
  return {
    detailedCategories: JSON.parse(JSON.stringify(groupByCategory)),
    noChangeCategory: JSON.parse(JSON.stringify(groupByCategory)),
    claimNumber: state.getClaims.selectedClaims.claimNumber,
    savedCategories: claimCategories,
    masterCategories: state.masterTable.categoriesSubCategories,
    totalPayment: state.getClaims.selectedClaims.totalPayment,
  };
};

export default  memo(connect(mapStateToProps, mapDispatchToProps)(ShowSaveChecklists));