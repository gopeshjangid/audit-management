import React, { useEffect, useState, useRef } from "react";
import Grid from "../../components/Grid";
import { connect } from "react-redux";
import AutoSuggestDropDown from "../../components/autoSuggestDropDown/autoSuggestDropDown";
import Layout from "../../components/layout/layout";
import {
  getCategoriesSubCategories,
  addSubCat,
  updateSubCat,
  deleteSubCategory,
} from "../../actions";
import { Input, Label, Col, Row, Nav, NavLink, Alert } from "reactstrap";
import { ClipLoader } from "react-spinners";

import "./index.scss";

const selectBoxStyle = {
  height: "40px",
};

const defaultSelectedCategory = "New Category";

function GetCategories(props) {
  const {
    categoryValues,
    categoryDropDownValue,
    categoriesSubCategories,
    showMessage,
    loader,
  } = props;
  const [tableData, setTableData] = useState([
    {
      subCategoryId: "",
      subCategory: "",
      category: "",
      claimNumber: "",
      indicator: "NA",
      errorType: "",
      editFlag: false,
    },
  ]);

  const [selectedCategoryName, setSelectedCategoryName] = useState(
    defaultSelectedCategory
  );
  const [loading, setLoader] = useState(false);
  const addCatName = useRef("");
  const editCatName = useRef("");
  const addSubCat = useRef("");
  const editSubCat = useRef("");
  const addErrorType = useRef("");
  const editErrorType = useRef("");

  const handleClickEditRow = (rowIndex, flag = true) => {
    setTableData((prev) =>
      prev.map((r, index) => ({
        ...r,
        editFlag: r.subCategoryId === rowIndex && flag,
      }))
    );
  };

  const handleClickDeleteRow = (saveSubCat) => {
    const updatedObj = {
      subCategoryId: saveSubCat.subCategoryId,
    };
    props.deleteSubCategory(updatedObj);
  };

  const getTableData = (allCatSubCat, selectedCat ) => {
    let data = allCatSubCat.filter(
      (val) => val.category === selectedCat
    );
    data = data.map(val => {
      val.editFlag = false;
      return val;
    });
    data.push({
      subCategoryId: "",
      subCategory: "",
      category: selectedCat,
      claimNumber: "",
      indicator: "NA",
      errorType: "",
      editFlag: false,
    });
    return data;
  }

  const formValidation = (saveSubCat) => {
    if (saveSubCat.subCategoryId === "" && addSubCat.current.value === "") {
      addSubCat.current.focus();
      return false;
    } else if (
      saveSubCat.subCategoryId !== "" &&
      editSubCat.current.value === ""
    ) {
      editSubCat.current.focus();
      return false;
    }
    return true;
  };

  const saveSubCategory = (saveSubCat) => {
    const flag = saveSubCat.subCategoryId === "";
    if (formValidation(saveSubCat)) {
      const updatedObj = {
        category:
          saveSubCat.category !== ""
            ? saveSubCat.category
            : addCatName.current.value,
        subCategoryId: saveSubCat.subCategoryId,
        status: "1",
        subCategory:
          saveSubCat.subCategoryId === ""
            ? addSubCat.current.value
            : editSubCat.current.value,
        errorType:
          saveSubCat.subCategoryId === ""
            ? addErrorType.current.value
            : editErrorType.current.value,
      };
      if (saveSubCat.subCategoryId === "") {
        addSubCat.current.value = "";
        if (addCatName.current && addCatName.current.value) {
          addCatName.current.value = "";
        }
      }
      if (flag) {
        props.addSubCat(updatedObj, flag);
      } else {
        props.updateSubCat(updatedObj, flag);
      }
    }
  };

  const CAT_SUB_CAT_GRID = [
    {
      title: "Category Name",
      key: "category",
      render: (value, row, index) => {
        if (row.category !== "") {
          return row.category;
        } else {
          return (
            <Input
              style={{ height: "40px" }}
              type="text"
              name="category"
              id="category"
              innerRef={row.subCategoryId === "" ? addCatName : editCatName}
              defaultValue={row.category === "New Category" ? "" : row.category}
            />
          );
        }
      },
      width: 150,
    },
    {
      title: "Sub Category Name",
      key: "subCategory",
      render: (value, row, index) => {
        if (row.subCategoryId && !row.editFlag) {
          return row.subCategory;
        } else {
          return (
            <Input
              style={{ height: "40px" }}
              type="text"
              name="subCategory"
              id="subCategory"
              innerRef={row.subCategoryId === "" ? addSubCat : editSubCat}
              defaultValue={row.subCategory}
            />
          );
        }
      },
      width: 400,
    },
    {
      title: "Error Type",
      key: "errorType",
      render: (value, row, index) => {
        if (row.subCategoryId && !row.editFlag) {
          return row.errorType;
        } else {
          return (
            <Input
              type="select"
              name="select"
              style={selectBoxStyle}
              defaultValue={row.errorType}
              innerRef={row.subCategoryId === "" ? addErrorType : editErrorType}
            >
              <option>PAYMENT</option>
              <option>PROCEDURAL</option>
              <option>NA</option>
            </Input>
          );
        }
      },
      width: 100,
    },
    {
      title: "Action",
      key: "Action",
      render: (value, row, index) => {
        if (row.subCategoryId && !row.editFlag) {
          return (
            <Nav>
              <NavLink
                className="categoryLink"
                href="#"
                title="Edit"
                onClick={() => handleClickEditRow(row.subCategoryId)}
              >
                <img
                  src="/pencil.png"
                  alt="Edit"
                  style={{ marginRight: "10px" }}
                />
              </NavLink>
              <NavLink
                className="categoryLink"
                href="#"
                title="Delete"
                onClick={() => handleClickDeleteRow(row)}
              >
                <img
                  src="/delete.jpg"
                  alt="delete"
                  style={{ height: "30px" }}
                />
              </NavLink>
            </Nav>
          );
        } else {
          return (
            <Nav>
              <NavLink
                className="categoryLink"
                href="#"
                title="Save"
                onClick={() => saveSubCategory(row)}
              >
                <img src="/save.png" alt="Save" style={{ height: "30px" }} />
              </NavLink>
              {row.subCategoryId !== "" && (
                <NavLink
                  className="categoryLink cancelIcon"
                  href="#"
                  title="Cancel"
                  onClick={() => handleClickEditRow(row.subCategoryId, false)}
                >
                  X
                </NavLink>
              )}
            </Nav>
          );
        }
      },
      width: 100,
    },
  ];

  const onChangeHandler = (value) => {
    setSelectedCategoryName(value);
    const newRow = [];
    if(value === "New Category"){
      newRow.push({
        subCategoryId: "",
      subCategory: "",
      category: "",
      claimNumber: "",
      indicator: "NA",
      errorType: "",
      editFlag: false,
      });
      // addCatName.current.value = "";
      setTableData(newRow);
    }else if(categoryValues.includes(value) ){
      const catSubCatData = getTableData(categoriesSubCategories, value);
      setTableData(catSubCatData);
    }
  };

  useEffect(() => {
    if(selectedCategoryName !== defaultSelectedCategory){
      const catSubCatData = getTableData(categoriesSubCategories, selectedCategoryName);
      setTableData(catSubCatData);
      setLoader(false)
    }
  }, [categoriesSubCategories, selectedCategoryName]);

  useEffect(() => {
    if (props.categoriesSubCategories.length === 0) {
      props.getCategoriesSubCategories();
      setLoader(true);
    }else if(props.categoriesSubCategories.length > 0 && loading){
      setLoader(false);
    }
    
  }, [props, loading]);

  return (
    <Layout>
      {showMessage && <Alert color="success">{showMessage}</Alert>}
      <Row sm={12}>
        <Col sm={12} className="labelCol" style={{ marginBottom: "4%" }}>
          <Col sm={5} style={{ float: "left" }}>
            <Label
              htmlFor="assignee"
              className="text-label"
              style={{ float: "right", marginTop: "10px" }}
            >
              Select Category
            </Label>
          </Col>
          <Col sm={4} style={{ float: "left" }}>
            <AutoSuggestDropDown
              name="selectedCategoryName"
              suggestionValue={categoryDropDownValue}
              defaultValue={selectedCategoryName}
              onChangeHandler={(e) => onChangeHandler(e)}
              hideIcon={true}
            />
          </Col>
        </Col>
      </Row>
      <div className={`text-center ${loader ? "categories-loader" : ""}`}>
        <ClipLoader loading={loading || loader} />
      </div>
      <Grid
        id="claimSearch"
        columns={CAT_SUB_CAT_GRID}
        data={tableData}
        justified={false}
        sortable={true}
        sortOrder={"asc"}
        useFixedHeader={true}
        rowKey={(record) => record.subCategoryId}
        clientSidePagination={tableData.length > 10}
      />
    </Layout>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesSubCategories: () => dispatch(getCategoriesSubCategories()),
    addSubCat: (payload, flag) => dispatch(addSubCat(payload, flag)),
    updateSubCat: (payload, flag) => dispatch(updateSubCat(payload, flag)),
    deleteSubCategory: (payload) => dispatch(deleteSubCategory(payload)),
  };
};

const mapStateToProps = (state) => {
  const categoriesSubCategories = state.masterTable.categoriesSubCategories.map(
    (val) => {
      return {
        ...val,
        editFlag: false,
      };
    }
  );

  return {
    categoriesSubCategories: categoriesSubCategories,
    categoryDropDownValue: state.masterTable.categoryDropDownValue,
    categoryValues: state.masterTable.categoryValues,
    showMessage: state.masterTable.showMessage,
    loader: state.masterTable.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetCategories);
