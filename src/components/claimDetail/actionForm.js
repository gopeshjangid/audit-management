import React, { useState, useRef, useEffect } from "react";
import TextArea from "@atlaskit/textarea";
import MessageList from "../../DesignSystem/MessageList";
import Button, { LoadingButton } from "@atlaskit/button";
import Styled from "styled-components";
import { useDispatch, connect } from "react-redux";
import { saveActionData } from "../../actions/action.getClaims";
import Loader from "../../DesignSystem/SimpleLoading";
import { AUDIT_STATUS_VALUE, USER_ROLE } from "../../constants/constant.app";
import PopUp from "./popUp";

const BtnContainer = Styled.div`
  display:flex;
  padding-bottom : 20px;
  padding-top : 20px;
  margin-bottom: 20px;
`;

const StyledLoader = Styled(Loader)`
  margin-left : 10px;
`;

const StyledBtn = Styled(Button)`
  margin-left : 10px;
`;

const LoaderContainer = Styled.div`
   width: 100%;
   text-align: center;
   padding-top: 20px;
`;

function ActionForm(props) {
  const { getClaims } = props;
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentLoader, setCommentLoading] = useState(false);
  const [isReadOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState("");
  const [size, setSize] = useState("auto");
  const [auditorLastComment, setAuditorLastComment] = useState("");
  const [comments, setComment] = useState([]);
  const [openPopup, setOpenPopUp] = useState(false);
  let actions = getClaims?.selectedClaims?.actions || [];
  const dispatch = useDispatch();
  const ref = useRef(null);

  const resetTextArea = () => {
    setSize("auto");
  };

  const focusHandler = (e) => {
    setShowSaveBtn(true);
  };

  const cancelHandler = (e) => {
    setShowSaveBtn(false);
    setValue("");
    resetTextArea();
    ref.current.blur();
  };

  const blurHandler = (e) => {
    ref.current.blur();
    if (value.trim() === "") {
      setShowSaveBtn(false);
      setValue("");
      resetTextArea();
    }
  };

  const textClickHandler = () => {
    if (size !== "vertical") {
      setSize("vertical");
    }
  };

  const changeHandler = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    if(getClaims?.selectedClaims?.auditStatus === AUDIT_STATUS_VALUE.examinerReview && localStorage.getItem("userType") === USER_ROLE.examiner && value){
      setOpenPopUp(true);      
    }else {
      if (value) {
        setReadOnly(true);
        setLoading(true);
        dispatch(
          saveActionData({
            claimNumber: getClaims?.selectedClaims?.claimNumber,
            notes: value,
            user: localStorage.getItem("userName"),
            userRole: localStorage.getItem("userType")
          })
        );
      }
    }
  };

  useEffect(() => {
    setCommentLoading(true);
  }, []);

  useEffect(() => {
    let formattedActions = actions
      .map((action) => {
        action.text = action.notes;
        return action;
      })
      .sort((a, b) => b.timestamp - a.timestamp);
    const data = formattedActions.find(val => val.userRole === USER_ROLE.auditor && val.text)
    setAuditorLastComment(data ? data.notes : "");
    setComment(formattedActions);

    const interval = setInterval(() => {
      setComment([...formattedActions]);
    }, 5000);
    setValue("");
    setLoading(false);
    setCommentLoading(false);

    setShowSaveBtn(false);
    ref.current.blur();
    setReadOnly(false);
    resetTextArea();
    return () => {
      clearInterval(interval);
    };
  }, [getClaims?.selectedClaims?.actions]);

  return (
    <div>
      <TextArea
        onChange={changeHandler}
        placeholder="Add a comment..."
        onFocus={(e) => focusHandler(e)}
        onBlur={blurHandler}
        value={value}
        ref={ref}
        onClick={textClickHandler}
        spellCheck
        isReadOnly={isReadOnly}
        resize={size}
        style={{ maxHeight: "50px" }}
      />
      
        <PopUp 
          auditor={getClaims.selectedClaims.auditor} 
          notes={value} 
          auditorLastComment={auditorLastComment}
          claimNumber={getClaims?.selectedClaims.claimNumber}  
          closePopup={() => setOpenPopUp(false)}
          setLoad={() =>{ setLoading(true);setReadOnly(true)} }
          openPopup={openPopup}
        />
      {showSaveBtn && (
        <BtnContainer>
          <LoadingButton
            onClick={clickHandler}
            isLoading={loading}
            label="Save"
            appearance="primary"
          >
            Save
          </LoadingButton>
          <StyledBtn
            onClick={() => cancelHandler(false)}
            label="Save"
            color="default"
          >
            Cancel
          </StyledBtn>
        </BtnContainer>
      )}
      {!commentLoader ? (
        comments?.map(
          (msg, key) =>
            msg.text && <MessageList {...msg} key={"msgkey-" + key} />
        )
      ) : (
        <LoaderContainer>
          <StyledLoader />
        </LoaderContainer>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
    getClaims: state.getClaims,
  };
};

export default connect(mapStateToProps, null)(ActionForm);
