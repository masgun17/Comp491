import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import route from "./tool/route.js";

function App() {
  return (
    <div className="App">
      <h>HEYyyyY</h>
      {/* <Router basename={"http://localhost:3001" || "/"}>
      <Routes>
        <Route exact path="/dashboard">
          <h>HEYY2</h>
        </Route>
      </Routes>
       </Router> */}
    </div>
  );
}

export default App;
