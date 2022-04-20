import { React, useEffect, useState } from "react";
import "../Styles/TextAnswer.css";

export default function TextAnswer({ answer, questionID }) {
  const [savedAnswer, setSavedAnswer] = useState("");

  // function handleSavedAnswer() {
  //   if (localStorage.getItemItem(questionID)) {
  //     // setSavedAnswer(localStorage.getItem(questionID));
  //     answer(localStorage.getItemItem(questionID));
  //   }
  // }

  useEffect(async () => {
    console.log("outside if in text area");
    console.log(localStorage.getItem(questionID), "saved");
    if (localStorage.getItem(questionID)) {
      console.log("inside if in text area");
      // answer(localStorage.getItem(questionID));
      setSavedAnswer(localStorage.getItem(questionID));
    }
  }, []);

  return (
    <textarea
      type='text' 
      className="inputArea"
      placeholder="Cevabınızı giriniz..."
      onChange={(e) => answer(e.target.value)}
      defaultValue={savedAnswer}
    />
  );
}
