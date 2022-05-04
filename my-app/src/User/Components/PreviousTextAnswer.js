import { React, useEffect, useState } from "react";

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
