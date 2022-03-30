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
// import AddQuestion from "./pages/AddQuestion";

function App() {
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
        </Route>
       </Routes>
       <button path="login" element={<Login />} />
    </BrowserRouter>
  );
}

export default App;
