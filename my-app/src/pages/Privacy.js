import React, { useState, useEffect } from "react";
import { addNumAction, fetchDBAction } from "../tool/actions";

const Privacy = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [sum, setSum] = useState('');

  async function submitNum(n1, n2) {
    var jsonData = {
      "data": [{
        "num1": n1,
        "num2": n2
      }]
    }
    const a = await addNumAction(jsonData);
    console.log(a);
    setSum(a);
  }

  async function fetchDB() {
    const a = await fetchDBAction();
    console.log(a);
  }

  return (
    <body>
      <h1>Privacy</h1>

      <div>Privacy</div>
      <label>
        Num1:
        <input
          type="text"
          name="name"
          id="num1"
          onChange={(e) => setNum1(e.target.value)}
        />
      </label>
      <label>
        Num2:
        <input
          type="text"
          name="name"
          id="num2"
          onChange={(e) => setNum2(e.target.value)}
        />
      </label>
      <button
        onClick={() => {
          setNum1(document.getElementById("num1").value);
          setNum2(document.getElementById("num2").value);
          submitNum(document.getElementById("num1").value, document.getElementById("num2").value);
          // fetchDB();
        }}
      >
        Sum
      </button>
      &emsp;&emsp;
      <input placeholder="Total" value={sum}></input>
      <div>
        
      </div>
    </body>
  );
};

export default Privacy;
