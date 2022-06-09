import { React, useEffect, useState } from "react";
//This component is constructed to show the free-text questions' answers in a text area in the part of "Cevaplarım" in Profile page
export default function TextAnswer({ answer }) {
  const [savedAnswer, setSavedAnswer] = useState(answer);

  return (
    <textarea
      type='text' 
      className="inputArea"
      value={savedAnswer}
      disabled={true}
    />
  );
}
