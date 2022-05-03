import  React, { useState, useEffect } from "react";
import Button from "@atlaskit/button";
import styled, { css } from "styled-components";
import SectionMessage from '@atlaskit/section-message'
const Popup = styled.div`
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  right: 10px;
  bottom: 0;
  width: 22%; /* Full width */
  height: 26%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  text-align : center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;;
  
`;

const StyledSectionMessage = styled(SectionMessage)`

section {
  border: 1px solid #e9b8b8 !important;
}
border: 1px solid #e9b8b8 !important;
`;
const Body = styled.div`
display: flex;
justify-content: center;
`;

export default function ForceModal({title,...props}) {


  return (
    <Popup>
       <StyledSectionMessage title="Save Changes ?" appearance="warning">
       <Body>
        <Button>Cancel</Button>&nbsp;&nbsp;
        <Button appearance="primary">Save</Button>
      </Body>
      </StyledSectionMessage>
    </Popup>
    
  );
}
