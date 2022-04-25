import { React, useEffect, useState } from "react";
import "../Styles/TextAnswer.css";

export default function TextAnswer({ answer, questionID }) {
  const [savedAnswer, setSavedAnswer] = useState("");

  useEffect(async () => {
    if (localStorage.getItem(questionID)) {
      setSavedAnswer(localStorage.getItem(questionID));
    }
  }, []);

  useEffect(async () => {
    answer(savedAnswer);
  }, [savedAnswer])

  return (
    <textarea
      type='text' 
      className="inputArea"
      placeholder="Cevabınızı giriniz..."
      onChange={(e) => setSavedAnswer(e.target.value)}
      value={savedAnswer}
    />
  );
}
