import  React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";

const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${props =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

const StyledLoader = styled(LoadingOverlay)`
        top: 45%;
        left: 0%;
        width :100%;
        position: fixed;
        color: white;
        font-size: 18px;
`;

export default function Loader({open , text}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(open)
  }, [open]);

  return (
      <div>
      <DarkBackground disappear={loaded}>
        <StyledLoader
          active={true}
          spinner={true}
          text={text || "Loading Please wait..."}
        >
          
        </StyledLoader>
      </DarkBackground>
    </div>
  );
}
