import React, { useState, useEffect } from "react";
import Styled from "styled-components";

import Button from "@atlaskit/button";
import SectionMessage from "@atlaskit/section-message";

const Background = Styled.div`
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;
const ModalStyled = Styled.div`
  position:absolute;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgb(9 30 66 / 8%), 0 2px 1px rgb(9 30 66 / 8%), 0 0 20px -6px rgb(9 30 66 / 31%);
  max-width: calc(100vw - 120px);
  max-height: calc(100vh - 119px);
  top: 26%;
  left: 37%;
  z-index : 99999;
  min-width: 300px !important;
`;

const ButtonBox = Styled.div`
  text-align : right;
  padding: 10px;
    background: white;
`;

const StyledSectionMessage = Styled(SectionMessage)`
  padding : 10px;
 
`;

export default function ModalMessage({ open, type, message ,actionHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  const close = () =>{
    setIsOpen(false);
    if(actionHandler){
      actionHandler(false);
    }
  } 
  return (
    isOpen && message && (
      <Background>
        <ModalStyled>
          <StyledSectionMessage title={type === "warning" ? "Warning": "Error"} appearance={type || "error"}>
            <p>{message}</p>
          </StyledSectionMessage>
          <ButtonBox>
            <Button onClick={close} appearance="danger">
              OK
            </Button>
          </ButtonBox>
        </ModalStyled>
      </Background>
    )
  );
}
