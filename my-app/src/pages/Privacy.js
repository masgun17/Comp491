import ApiService from "../ApiService";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const Privacy = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [sum, setSum] = useState(0);

  const config = {
    headers: { "content-type": "application/json" },
  };
  const api = axios.create({
    baseURL: "http://localhost:5000/",
  });

  api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error?.response?.data)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        return Promise.reject(error.response?.data);
      }
      return Promise.reject(error);
    }
  );

  // const dispatch = useDispatch();

  const addNumService = (data) =>
    new Promise((resolve, reject) => {
      console.log("addNumService");
      console.log(data);
      api.get("add", data).then(resolve).catch(reject);
    });

  const addNumAction = createAsyncThunk("add", async (data, thunkAPI) => {
    try {
      console.log("addNumAction");
      const response = await addNumService(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

  // const sumTwoDigit = () => {
  //   ApiService.sumTwoDigit({ num1, num2 })
  //     .then((response) => this.props.sumTwoDigit(response))
  //     .catch((error) => console.log("error", error));
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setNum1(0);
  //   setNum2(0);
  // };

  async function submitNum() {
    // var formData = new FormData();
    // formData.append("num1", 1);
    // formData.append("num2", 2);
    // console.log(formData);
    // // const a = await dispatch(addNumAction(formData));
    // const data = JSON.stringify({
    //   "num1": 2,
    //   "num2": 3
    // });
    // console.log(data);
    // const a = await addNumService(data);
    // console.log("Submit done");
    // console.log(a);

    // await fetch("http://localhost:5000/add", {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     "num1": "2",
    //     "num2": "3"
    //   }),
    // });

    // const data = JSON.stringify({
    //   num1: 2,
    //   num2: 3,
    // });
    // axios.post("http://localhost:5000/add", data).end((error, response) => {
    //   if (!error && response) {
    //     console.log("got a valid response from the server");
    //   } else {
    //     console.log(`Error fetching data from the server: `, error);
    //   }
    // });

    // fetch(`http://localhost:5000/add`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     "num1": 2,
    //     "num2": 3,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .catch((error) => console.log(error));

    // const response = fetch(`http://localhost:5000/add`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   value: JSON.stringify({
    //     num1: 2,
    //     num2: 3,
    //   }),
    // });
    // console.log(response);
    // return response.json();

    var xhr = new XMLHttpRequest();

    // get a callback when the server responds
    xhr.onreadystatechange = function () {
      // Typical action to be performed when the document is ready:
      console.log(xhr.responseText);
      console.log(xhr.response);
      console.log(xhr.data);
      console.log(xhr.JSON);
      console.log(xhr);
    };
    // open the request with the verb and the url
    await xhr.open("POST", "http://localhost:5000/add");
    // send the request
    await xhr.send(JSON.stringify({ num1: "2", num2: "3" }));
    setSum(xhr.responseText);

    xhr.onload = function() {
      if (xhr.status != 200) { // analyze HTTP status of the response
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else { // show the result
        alert(`Done, got ${xhr.response.length} bytes`); // responseText is the server
      }
    };
    
    xhr.onprogress = function(event) {
      if (event.lengthComputable) {
        alert(`Received ${event.loaded} of ${event.total} bytes`);
      } else {
        alert(`Received ${event.loaded} bytes`); // no Content-Length
      }
    
    };
    
    xhr.onerror = function() {
      alert("Request failed");
    };
  }


  useEffect(async () => {
    console.log(sum);
  }, [sum]);


  return (
    <body>
      <h1>Privacy</h1>

      <div>Privacy</div>
      <input value={sum}></input>
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
          submitNum();
        }}
      >
        Sum
      </button>
      <div> </div>
    </body>
  );
};

export default Privacy;
