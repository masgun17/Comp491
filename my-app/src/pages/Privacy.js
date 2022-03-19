import ApiService from "../ApiService";
import React, { useState, useEffect } from "react";

const Privacy = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  const sumTwoDigit = () => {
    ApiService.sumTwoDigit({ num1, num2 })
      .then((response) => this.props.sumTwoDigit(response))
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sumTwoDigit();
    setNum1(0);
    setNum2(0);
  };

  return (
    <body>
      <h1>Privacy</h1>

      <div>// Privacy</div>

      <form onSubmit={handleSubmit}>
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
      </form>

      <button className="btn btn-primary mt-2">Publish article</button>
      <button
        onClick={() => {
          setNum1(document.getElementById("num1").value);
          setNum2(document.getElementById("num2").value);
          sumTwoDigit();
          
        }}
      >
        Sum
      </button>
      <div> </div>
    </body>
  );
};

export default Privacy;
