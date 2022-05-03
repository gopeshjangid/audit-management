import React, {memo, useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  background: transparent;
  margin-bottom: 12px;
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top:20px;
  ${(props) =>
    props?.headerStyle &&
    css`
      ${props?.headerStyle}
    `}
`;
const H5 = styled.h5`
  color: rgb(0, 82, 204);
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
`;

const Details = styled.div`
  display: none;
  border: 1px solid rgb(223, 225, 230);
  margin-bottom: 20px;
  padding: 10px;
  padding-bottom: 20px;
  ${(props) =>
    props?.noBorder &&
    css`
      border: none !important;
    `}
  ${(props) =>
    props.show &&
    css`
      display: block;
    `}
`;

export default memo(function Accordion(props) {
  const [open, setOpen] = useState(props.openFlag || localStorage.getItem('userType') === 'AUDITOR');
  const status = open ? "Hide" : "Show";
  const title = props?.title
    ? status + " " + props?.title
    : !open
    ? "Show more"
    : "Show less";
  return (
    <>
      {" "}
      <Header show={open} headerStyle={props?.headerStyle}>
        <H5 onClick={() => setOpen(!open)}>{title}</H5>
      </Header>
      <Container>
        <Details show={open} noBorder={props?.noBorder || false}>
          {props.children}
        </Details>
      </Container>
    </>
  );
});
