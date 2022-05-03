import React from 'react';

import Styled from "styled-components";

const StyledLabel = Styled.label `
  font-size: 15px;
  color: rgb(66, 82, 110);
  font-size: 0.857143em !important;
`
 function Label(props) {
  return <StyledLabel >{props.children}</StyledLabel>;
}

export {Label}