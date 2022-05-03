import React, { useState ,useEffect } from "react";
import styled, { css } from "styled-components";
//import Avatar from "@atlaskit/avatar";
import { SimpleTag as Tag } from "@atlaskit/tag";
import Arrow from "@atlaskit/icon/glyph/arrow-right";
import moment from "moment-timezone";
import { EST_TIMEZONE } from "../constants/constant.app";
import Tooltip from "./Tooltip";
import Button from "@atlaskit/button";
import Avatar from 'react-avatar';
const Container = styled.div`
  display: flex;
  margin-bottom: 14px;
  margin-top: 20px;
`;
const Details = styled.div`
  font-size: 1em;
  line-height: 1.714;
  font-weight: normal;
  padding-left: 35px;
  padding-top: 0px;
  margin-bottom: 0px;
  letter-spacing: -0.005em;
  color: rgb(23, 43, 77);
  margin-top: -13px;
  height: 22px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
`;

const LoadMoreButton = styled(Button)`
   width : 40% !important;
    margin-top: 25px !important;
    margin-bottom: 25px !important;
`;

const Typography = styled.span`
  font-size: 14px;
  height: inherit;
  letter-spacing: normal;
  line-height: 39px;
  margin-left: 5px;
  ${(props) =>
    props?.dark &&
    css`
      color: rgb(66, 82, 110);
      font-weight: 500;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    `}

  ${(props) =>
    props?.elevated &&
    css`
      line-height: 49px !important;
    `}
`;
const ProfileBox = styled.div`
  display: flex;
`;

const LabelContainer = ({ type, from, to }) => {
  if (type === "auditStatus") {
    return (
      <ProfileBox>
        {" "}
        <Tag color="blueLight" text={from} />{" "}
        <Typography>
          {" "}
          <Arrow />{" "}
        </Typography>{" "}
        <Tag color={to === "DONE" ? "greenLight" : "blueLight"} text={to} />
      </ProfileBox>
    );
  } else if (type === "assignee") {
    return (
      <ProfileBox>
        <Avatar color='#808787' round={true} size="40" name={from} />
        <Typography>{from ? from : "Unassigned"}</Typography>
        <Typography elevated>
          {" "}
          {"  "}
          <Arrow />{" "}
        </Typography>{" "}
        {"  "}
        <Avatar color='#3e43f6'  round={true} size="40" name={to} />
        <Typography>{to}</Typography>
      </ProfileBox>
    );
  } else if (type === "errorType") {
    return (
      <ProfileBox>
        {
          from && <>
            <Typography>{from}</Typography>
            <Typography elevated>
              {" "}
              {"  "}
              <Arrow />{" "}
            </Typography>{" "}</>
        }
        <Typography>{to}</Typography>
      </ProfileBox>
    );
  } else if (type === "financialAccuracy") {
    return (
      <ProfileBox>
        { from && <>
        <Typography>{from}</Typography>
        <Typography elevated>
          {" "}
          {"  "}
          <Arrow />{" "}
        </Typography>{" "}
        </>}
        <Typography>{to}</Typography>
      </ProfileBox>
    );
  } else if (type === "monetoryValue") {
    return (
      <ProfileBox>
        {from && <>
        <Typography>{from}</Typography>
        <Typography elevated>
          {" "}
          {"  "}
          <Arrow />{" "}
        </Typography>
        </>}
        <Typography>{to}</Typography>
      </ProfileBox>
    );
  } else if (type === "paymentType") {
    return (
      <ProfileBox>
        {from && <>
        <Typography>{from}</Typography>
        <Typography elevated>
          {" "}
          {"  "}
          <Arrow />{" "}
        </Typography>{" "}
        </>}
        <Typography>{to}</Typography>
      </ProfileBox>
    );
  } else if (type === "isAgree") {
    return (
      <ProfileBox>
        { from && <>
        <Typography>{from}</Typography>
        <Typography elevated>
          {" "}
          {"  "}
          <Arrow />{" "}
        </Typography>{" "}
        </>
       }
        <Typography>{to}</Typography>
      </ProfileBox>
    );
  }

  return "";
};

export default function Message(props) {
  const [page, setPage] = useState(1);
  const list = props?.list?.sort((a, b) => b.dateTime - a.dateTime);
  const [messageList, setMessageList] = useState(list?.slice(0,10));
  const [showLoadMore, setShowLoadmore] = useState(true);
  const size = 10;

  useEffect(()=>{
    let list = props?.list?.sort((a, b) => b.dateTime - a.dateTime)?.slice(0,10);
    setMessageList([...list]);
  },[props?.list]);

  const loadMore = () =>{
    let len = list.length;
    let nextPage = page+1;
    let limit = nextPage * size;

    if(limit> len){
      setShowLoadmore(false);
    }
    setPage(nextPage);
    setMessageList(list?.slice(page ,limit));

  }

  useEffect(()=>{
    let len = list.length;
    if(size > len){
      setShowLoadmore(false);
    }
  },[])

  const getLabelMessage = (userName, dateTime, type, from, to, userType) => {
    let message = "";
    let label = "";
   
    if (type === "auditStatus") {
      message = from === "" ? "added a" : "updated the";
      label = "status";
    } else if (type === "assignee") {
      message = "changed the";
      label = "assignee";
      userName = !from || from === "Unassigned" ? to : userName;
    } else if (type === "errorType") {
      message = !from ? "added a " : "updated the ";
      label = "Error type";
    } else if (type === "paymentType") {
      message = !from ? "added a " : "updated the ";
      label = "payment type";
    } else if (type === "monetoryValue") {
      message = !from ? "added a " : "updated the ";
      label = "monetary value";
    } else if (type === "financialAccuracy") {
      message = !from ? "added a " : "updated the ";
      label = "financial accuracy";
    } else if (type === "isAgree"){
      message = !from ? " added a " : "updated the ";
      label = "isAgree";
    }
    return (
      <Container>
        <Tooltip content={userType}>
          <Avatar color='#00a79d'  round={true} size="40" name={userName} />
        </Tooltip>
        <Typography dark>{userName || "Unknown"}</Typography>
        <Typography>{message}</Typography>
        <Typography dark>{label}</Typography>&nbsp;
        <Typography>
          {" "}
          {moment(dateTime).tz(EST_TIMEZONE).format("MMMM D, YYYY hh:mm:ss A")}
        </Typography>
      </Container>
    );
  };
  return (
    <div>
      {messageList?.map(({ userName, dateTime, from, type, to, userRole }, key) => (
          <React.Fragment key={"profile" + key}>
            {getLabelMessage(userName, dateTime, type, from, to, userRole)}
            <Details>
              <LabelContainer from={from} to={to} type={type} />{" "}
            </Details>
          </React.Fragment>
        ))}

        {showLoadMore && <LoadMoreButton onClick={loadMore}>Load more</LoadMoreButton> }
    </div>
  );
}
