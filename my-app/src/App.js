import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Header from "./Common/Components/Header";
import DiseaseInformationPage from "./Information/Pages/DiseaseInformationPage";
import RiskFactorsPage from "./Information/Pages/RiskFactorsPage";
import Dashboard from "./Common/Pages/Dashboard";
import TestInformationPage from "./Test/Pages/TestInformation";
import Contact from "./Information/Pages/Contact";
import Privacy from "./Information/Pages/Privacy";
import ShowTest from "./Test/Pages/ShowTest";
import TakeTest from "./Test/Pages/TakeTest";
import Login from "./User/Pages/Login";
import Signup from "./User/Pages/Signup";
import Approve from "./User/Pages/Approve";
import Profile from "./User/Pages/Profile";
import Statistics from "./Information/Pages/Statistics";
import { useState, useContext } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [emailForProfile,setEmailForProfile] = useState("");
  const [phoneForProfile,setPhoneForProfile] = useState("");
  const [id, setId] = useState("");
  const [userTypeId, setUserTypeId] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Dashboard />} />
          <Route path="diseaseInformationPage" element={<DiseaseInformationPage />} />
          <Route path="riskFactors" element={<RiskFactorsPage />} />
          <Route path="testInformation" element={<TestInformationPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="showTest" element={<ShowTest />} />
          <Route path="takeTest" element={<TakeTest />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="approve" element={<Approve />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="profile" element={<Profile />} />
        </Route>
       </Routes>
       {/* <button path="login" element={<Login />} /> */}
    </BrowserRouter>
  );
}

export default App;
