import React, { useState } from "react";
import styled, { css } from "styled-components";
import { SimpleTag as Tag } from "@atlaskit/tag";
const TabContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Item = styled.div`
  cursor: pointer;
  flex: 0.1;
  ${(props) =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

const ItemContainer = styled.div`
  display: none;

  ${(props) =>
    props.show &&
    css`
      display: block !important; /* show */
    `}
`;

const ItemList = styled.div`
  padding-bottom: 15px;
  display: flex;
  width: auto;
  justify-content: flex-start;
`;

const StyledTag = styled(Tag)`
cursor : pointer;
`;

export default function Tabs(props) {
  const [open, setOpen] = useState(0);

  const openHandler = (key) => {
    setOpen(key);
  };

  return (
    <TabContainer>
      <ItemList>
        <Item onClick={() => openHandler(0)} key={"tabitem-1"}>
          <StyledTag color={open === 0 ? "grey" : ""} text="Comments" />
        </Item>
        <Item onClick={() => openHandler(1)} key={"tabitem-2"}>
          <StyledTag color={open === 1 ? "grey" : ""} text="History" />
        </Item>
      </ItemList>
      {props?.list.map((item, key) => (
        <ItemContainer key={item+key} show={open === key}>{item}</ItemContainer>
      ))}
    </TabContainer>
  );
}
