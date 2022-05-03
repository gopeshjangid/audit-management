import React, { useRef, useEffect, memo } from "react";
import { RADIO_BUTTON_VALUES, USER_ROLE } from "../../constants/constant.app";

function RadioButton(props) {
  const slidingButtonDivRef = useRef(null);
  const disableFlag = (localStorage.getItem("userType") !== USER_ROLE.examiner);
  const handleOptionChange = (event) => {
    if(disableFlag){
      let data = props.catData;
      data.indicator = RADIO_BUTTON_VALUES[event.target.innerText]["indicator"];
      props.handleChangedValue(data);
      props.handleOptionValue(event.target.innerText);
    }
  };
 
  useEffect(() => {
    slidingButtonDivRef.current.style.transform = RADIO_BUTTON_VALUES[props.selectedOption]["transformStyle"];
    slidingButtonDivRef.current.style.background = RADIO_BUTTON_VALUES[props.selectedOption]["backgroundColor"];
  }, [slidingButtonDivRef, props.selectedOption]);

  return (
    <>
      <div
        id="three-way-toggle-switch-component-div"
        tabIndex="0"
        style={{ margin: "10px", marginTop: "0px" }}
      >
        <div id="radio-buttons-and-sliding-button-container-div">
          <div id="radio-buttons-div">
            {[1, 2, 3].map((val) => {
              return (
                <label
                  id={`option-${val}-label`}
                  className="single-option-label"
                  htmlFor={`option-${val}`}
                  name={props.index + "radio"}
                  onClick={handleOptionChange}
                  key={"radioLabel"+props.catData.subCategoryId+val}
                  style={{display: disableFlag ? "inline-block": "none"}}
                >
                  {val}
                </label>
              );
            })}
          </div>
          <div ref={slidingButtonDivRef} id="sliding-button-div">
            {props.selectedOption === "1" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-check"
                viewBox="0 0 16 16"
              >
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
              </svg>
            )}
            {props.selectedOption === "3" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(RadioButton);