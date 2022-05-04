import { LocalDining } from "@material-ui/icons";
import { React, useEffect, useState } from "react";
import "../Styles/Checkbox.css";

export default function Checkbox({ filled, content, select, load }) {
  // Clickable is sent FROM parent, filled is sent TO parent, content is sent FROM parent
  // const [checked, setChecked] = useState(filled);

  // useEffect(async () => {
  //   filled(true);
  // }, [checked]);

  function handleClick() {
    // setChecked(!filled);
    select();
  }

  useEffect(async () => {
    load();
    // console.log("loaded the checkbox");
  }, []);

  return (
    <div className="checkboxContainer">
      <button
        className={filled ? "filledCheckboxButton" : "checkboxButton"}
        onClick={() => {
          handleClick();
        }}
      />
      <div className="checkboxContent">{content}</div>
    </div>
  );
}
