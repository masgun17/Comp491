import { LocalDining } from "@material-ui/icons";
import { React, useEffect, useState } from "react";
import "../Styles/PreviousTest.css";

export default function Checkbox({ filled, content}) {
// This component is used to show the multiple choice question in "Cevaplarım" area.
  return (
    <div className="checkboxContainer">
      <button
        className={filled ? "filledCheckboxButton" : "checkboxButton"}
      />
      <div className="checkboxContent">{content}</div>
    </div>
  );
}
