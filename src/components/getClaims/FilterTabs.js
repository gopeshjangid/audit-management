import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Button from "@atlaskit/button";

import Badge from "../../DesignSystem/Badge";

const TabContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TabItem = styled.div`
 
`;


const StyledButton = styled(Button)`
  margin-left: 12px;
  margin-right: 12px;
  ${(props) =>
    props.appearance === "primary" &&
    css`
      background: #00a79d !important;
    `}

  ${props => props?.disabled && css `
   cursor: no-drop !important;
 `}
`;


export default React.memo( function Tabs(props) {
  const { tabHandler } = props;
  const [selected, setSelected ] = useState("");
  const {
    inProgressClaimsCount,
    openClaimsCount,
    pendingClaimsCount,
    assignedToCurrentUserCount,
    inReviewCount
  } = props?.claimsData;
  

  useEffect(() => {
    if (tabHandler && selected) {
      tabHandler(selected);
      let tab = selected === '' ? 'ASSIGNEE'   : selected
      setSelected(tab)
    }
  }, [selected]);

  const role = localStorage.getItem('userType');
console.log("selected" ,selected)
  return (
    <TabContainer>
      <TabItem key="assignKey">
        <StyledButton
          appearance={selected === "ASSIGNEE" || selected === "" ? "primary" : ""}
          onClick={() => setSelected("ASSIGNEE")}
        >
          <Badge type={"number"}>{assignedToCurrentUserCount || 0} </Badge> &nbsp;ASSIGNED TO ME
        </StyledButton>
      </TabItem>
      <TabItem key="openKey">
        <StyledButton
         disabled={role === 'EXAMINER'}
          appearance={selected === "OPEN" ? "primary" : ""}
          onClick={() => role !== 'EXAMINER' ? setSelected("OPEN") : ''}
        >
           <Badge type={"number"}>{openClaimsCount || 0} </Badge> &nbsp;
          OPEN
        </StyledButton>
      </TabItem>
      <TabItem key="inporgressKey">
        {" "}
        <StyledButton
          disabled={role === 'EXAMINER'}
          appearance={selected === "IN-PROGRESS" ? "primary" : ""}
          onClick={() => role !== 'EXAMINER' ? setSelected("IN-PROGRESS") : ''}
        >
           <Badge type={"number"}>{inProgressClaimsCount || 0} </Badge> &nbsp;
          IN-PROGRESS
        </StyledButton>
      </TabItem>
      <TabItem key="pendingKey">
        {" "}
        <StyledButton
          disabled={role === 'EXAMINER'}
          appearance={selected === "IN-REVIEW" ? "primary" : ""}
          onClick={() => role !== 'EXAMINER' ?  setSelected("IN-REVIEW"): '' }
        >
           <Badge type={"number"}>{inReviewCount || 0} </Badge> &nbsp;
            OTHERS
        </StyledButton>
      </TabItem>
      <TabItem key="searchtabKey">
        {" "}
        <StyledButton
          appearance={selected === "SEARCH" ? "primary" : ""}
          onClick={() =>  (role !== 'EXAMINER' || role === null) ? setSelected("SEARCH") : ''}
          disabled={role === 'EXAMINER' || role === null}
        >
          SEARCH
        </StyledButton>
      </TabItem>
    </TabContainer>
  );
});
