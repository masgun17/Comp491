import React, { useState, useContext } from "react";
import "../Styles/InfoPage.css";
import { FontSizeContext } from "../../Helper/Context";
import seda from "./seguney.jpg";
const Contact = () => {
  const { fontSize, setFontSize } = useContext(FontSizeContext) //To share the font-size of all of the text between the components and pages

  return (
    <div>
      <div className="testInformationPageLayout">
        <div className="testInfoDiv2" style={{ "grid-row-start": "2", "font-size": fontSize, "line-height": "1.8" }}>
          <img src={seda} alt="Seda Güney" style={{ maxWidth: "300px", maxHeight: "450px" }} />
          <div className="alignContact">
            <br></br>
            Dr. Öğr. Üyesi Seda Güney
            <br></br>
            Koç Üniversitesi Hemşirelik Fakültesi
            <br></br>
            seguney@ku.edu.tr
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
