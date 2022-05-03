import React from "react";
import { saveActionData } from "../../actions/action.getClaims";
import { useDispatch } from "react-redux";
import Styled from "styled-components";
import { Modal, ModalBody } from 'reactstrap';
import Button from "@atlaskit/button";

const BtnContainer = Styled.div`
  display:flex;
  padding-bottom : 20px;
  place-content: flex-end;
  margin-right: 20px;
`;

const StyledBtn = Styled(Button)`
  margin-left : 10px;
`;


function PopUp(props) {
  const { closePopup, claimNumber, notes, auditor, auditorLastComment, openPopup } = props;
  const dispatch = useDispatch();
  const comment = auditorLastComment ? `"${auditorLastComment || ''}"` : "";
  const clickHandler = (e, isAgree) => {
    e.preventDefault();
    props.setLoad();
    props.closePopup();
    dispatch(
      saveActionData({
        claimNumber: claimNumber,
        isAgree: isAgree,
        notes: notes,
        user: localStorage.getItem("userName"),
        userRole: localStorage.getItem("userType"),
      })
    );
  };

  return (
    <Modal isOpen={openPopup} toggle={closePopup} style={{top: "20%"}}>
        <ModalBody>
          <Button appearance="subtle-link" onClick={closePopup} style={{fontSize: "larger", float: "right"}}>X</Button>
          <p style={{marginTop: "10px"}}>{`Do you agree with ${auditor ?? "" }'s comments ${comment}`}</p>
        </ModalBody>
        <BtnContainer>
          <StyledBtn
            onClick={(e) => clickHandler(e,true)}
            label="Save"
            appearance="primary"
          >
            Yes
          </StyledBtn>
          <StyledBtn
            onClick={(e) => clickHandler(e,false)}
            label="Save"
            color="default"
          >
            No
          </StyledBtn>
        </BtnContainer>
      </Modal>
    
  );
}

export default PopUp;
