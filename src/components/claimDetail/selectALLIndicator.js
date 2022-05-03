import React from "react";

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";

export default function SelectALLIndicator(props) {
  const { updateCategoryIndicatorValues } = props;
  const disabledFlag = (localStorage.getItem('userType') === "EXAMINER");
  return (
    <DropdownMenu
      position="top"
      trigger="ALL"
      triggerType="button"
      className="dropdownAtlasti"
      isDisabled={disabledFlag}
    >
      {!disabledFlag && <DropdownItemGroup>
        <DropdownItem onClick={() => updateCategoryIndicatorValues(1)}>
          <div style={{ height: "33px", width: "37px", background: "green" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="35"
              fill="white"
              className="bi bi-check"
              viewBox="0 0 16 16"
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
          </div>
        </DropdownItem>
        <DropdownItem onClick={() => updateCategoryIndicatorValues(2)}>
          <div
            style={{ height: "33px", width: "37px", background: "grey" }}
          ></div>
        </DropdownItem>
        <DropdownItem onClick={() => updateCategoryIndicatorValues(3)}>
          <div style={{ height: "33px", width: "37px", background: "red" }}>
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
          </div>
        </DropdownItem>
      </DropdownItemGroup>}
    </DropdownMenu>
  );
}
