import React ,{memo} from "react";
import styled ,{css} from "styled-components";
import Textfield from "@atlaskit/textfield";

const StyledText = styled(Textfield)`
  input {
    padding: 8px 14px !important;
  }
 
`;

const ElementBefore = styled.span`
  
  ${props => props.isAmount && css `
     position:absolute;
     left: 21px;
  `}
  
`;

export default memo(function TextField(props) {
  const {isAmount, ...restProps}  = props;
  return (
    <StyledText
      elemBeforeInput={
        props?.before ? <ElementBefore isAmount={isAmount}>{props?.before}</ElementBefore> : ""
      }
      elemAfterInput={
        props?.after ? <ElementBefore>{props?.after}</ElementBefore> : ""
      }
      name="basic"
      aria-label="field"
      {...restProps}
    />
  );
});
