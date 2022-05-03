import React from 'react';
import  { HelperMessage } from '@atlaskit/form';
import Styled ,{css} from "styled-components";

const StyledLabel = Styled.span `
  font-size: 0.817143em !important;
  color : red !important;
`
 function HelperMessageComponent(props) {
   const  {error}  = props
  return <StyledLabel error={error}>{props?.children}</StyledLabel>;
}

export default HelperMessageComponent;