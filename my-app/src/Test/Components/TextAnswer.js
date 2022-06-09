import { React, useEffect, useState } from "react";
import "../Styles/TextAnswer.css";

export default function TextAnswer({ answer, questionID }) {
  const [savedAnswer, setSavedAnswer] = useState("");

  useEffect(async () => { // fetch from local storage - if present
    if (localStorage.getItem(questionID)) {
      setSavedAnswer(localStorage.getItem(questionID));
    }
  }, []);

  useEffect(async () => { // when input changes, send it to parent
    answer(savedAnswer);
  }, [savedAnswer])

  return (
    <input
      // pattern="^[0-9]*$"
      type='number' 
      className="inputArea"
      placeholder="Cevabınızı giriniz..."
      onChange={(e) => setSavedAnswer(e.target.value)}
      value={savedAnswer}
    />
  );
}
