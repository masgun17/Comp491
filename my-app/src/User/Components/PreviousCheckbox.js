import { LocalDining } from "@material-ui/icons";
import { React, useEffect, useState } from "react";
import "../Styles/PreviousTest.css";

export default function Checkbox({ filled, content}) {

  return (
    <div className="checkboxContainer">
      <button
        className={filled ? "filledCheckboxButton" : "checkboxButton"}
      />
      <div className="checkboxContent">{content}</div>
    </div>
  );
}
