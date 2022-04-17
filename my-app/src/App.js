import React from "react";
import './styles/styles.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Header from "./pages/Header";
import DiseaseInformationPage from "./pages/DiseaseInformationPage";
import RiskFactorsPage from "./pages/RiskFactorsPage";
import Dashboard from "./pages/Dashboard";
import TestInformationPage from "./pages/TestInformation";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import ShowTest from "./pages/ShowTest";
import TakeTest from "./pages/TakeTest";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Approve from "./pages/Approve";
import Profile from "./pages/Profile";
import Statistics from "./pages/Statistics";
import { LoginContext, UserNameContext, UserSurnameContext,UserEmailContext, UserPhoneContext,UserIdContext,UserTypeIdContext} from "./Helper/Context";
import { useState, useContext } from 'react';

// import AddQuestion from "./pages/AddQuestion";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [emailForProfile,setEmailForProfile] = useState("");
  const [phoneForProfile,setPhoneForProfile] = useState("");
  const [id, setId] = useState("");
  const [userTypeId, setUserTypeId] = useState("");
  return (
    <LoginContext.Provider value={{isLogin, setIsLogin}}>
    <UserNameContext.Provider value={{name, setName}}>
    <UserSurnameContext.Provider value={{surname, setSurname}}>
    <UserEmailContext.Provider value={{emailForProfile,setEmailForProfile}}>
    <UserPhoneContext.Provider value={{phoneForProfile,setPhoneForProfile}}>
    <UserTypeIdContext.Provider value={{userTypeId, setUserTypeId}}>
    <UserIdContext.Provider value={{id, setId}}>

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
      </UserIdContext.Provider>
      </UserTypeIdContext.Provider>
      </UserPhoneContext.Provider>
      </UserEmailContext.Provider>
      </UserSurnameContext.Provider>
      </UserNameContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
