import React from "react";
import styled ,{css} from "styled-components";
import Avatar from "react-avatar";
import ToolTip from  "./Tooltip";
function timeSince(timeStamp) {
  let currentTime = Date.now();
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  var elapsed = currentTime - timeStamp;

  if (elapsed < msPerMinute) {
    return 'Just now ';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return Math.round(elapsed / msPerYear) + ' years ago';
  }
}

const Container = styled.div`
  display: flex;
  margin-top: 20px;
`;
const MessageElement = styled.p`
  font-size: 1em;
  line-height: 1.714;
  font-weight: normal;
  padding-left: 40px;
  padding-top: 0px;
  margin-bottom: 0px;
  letter-spacing: -0.005em;
  color: rgb(23, 43, 77);
  margin-top: -13px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
`;

const Typography = styled.h5`
  color: rgb(66, 82, 110);
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  height: inherit;
  letter-spacing: normal;
  line-height: 37px;
  margin-left: 10px;
  ${(props) => props?.light && css`
   font-family :  "Helvetica Neue", sans-serif;
  `}
`;

export default function Message(props) {
  const { text, user  ,timestamp ,userRole} = props;

  return (
    <div>
      <Container>
        <ToolTip content={userRole ? userRole : 'Unknown User'}><Avatar color='#00a79d' round={true} size={40} name={user} /></ToolTip>
        <Typography>{user ? user : 'Unknown'}</Typography>
        <Typography light>{' '} {timestamp ? timeSince(parseInt(timestamp)) : ''}</Typography>
      </Container>
      <MessageElement> {text}  </MessageElement>
    </div>
  );
}
