import { LocalDining } from "@material-ui/icons";
import { React, useEffect, useState, useContext } from "react";
import "../Styles/Checkbox.css";
import { FontSizeContext } from "../../Helper/Context";

export default function Checkbox({ filled, content, select, load }) {
  // Clickable is sent FROM parent, filled is sent TO parent, content is sent FROM parent

  const { fontSize, setFontSize } = useContext(FontSizeContext);

  function handleClick() {  // on click behavior, selects the checkbox
    select();
  }

  useEffect(async () => { // initialize function - if present, fetches from local storage, otherwise sets false
    load();
  }, []);

  return (
    <div className="checkboxContainer" style={{"font-size":fontSize}}>
      <button style={{"font-size":fontSize}}
        className={filled ? "filledCheckboxButton" : "checkboxButton"}
        onClick={() => {
          handleClick();
        }}
      />
      <div className="checkboxContent">{content}</div>
    </div>
  );
}
