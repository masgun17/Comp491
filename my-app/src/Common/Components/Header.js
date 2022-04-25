import { Outlet, Link, Navigate } from "react-router-dom";
import { FontSizeContext} from "../../Helper/Context";
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import React, { useState, useContext } from "react";
import "../Styles/Header.css"
import { Row, Col, Grid } from 'react-bootstrap';

const Header = (props) => {
  let userLogged = sessionStorage.getItem('isLogin');
  let userTypeId = sessionStorage.getItem('userTypeId')
  const{fontSize,setFontSize} = useContext(FontSizeContext) 

  const increaseFont = () => {
    if(fontSize+10<50){
      setFontSize(fontSize+10);
    }
  }

  const decreaseFont = () => {
    if(fontSize-10>10){
      setFontSize(fontSize-10);
    }
  }

  return (
    <div className="headerWholePage">
      <div className="header" style={{ "grid-row-start": "1", "grid-row-end": "2" }}>
        <div className="btn-group">
        <button class="btn btn-dark btn-sm" id="fontSizeIncrease" style={{"font-size":"20px", "margin":"0.5%"}} onClick={() => {increaseFont(false)}}><ZoomIn style={{"font-size":"40px"}}></ZoomIn>  </button>  
        <button class="btn btn-dark btn-sm" id="fontSizeDecrease" style={{"font-size":"20px", "margin":"0.5%"}} onClick={() => {decreaseFont(true)}}><ZoomOut style={{"font-size":"40px"}}></ZoomOut> </button>     
          </div>
          <Row>
            <Col className="d-flex align-items-center"><Link style={{"color":"white"}} to="/">Anasayfa</Link></Col>
        <Col className="d-flex align-items-center"><Link style={{"color":"white"}} to="/diseaseInformationPage">Alzheimer Hastalığı</Link></Col>
        <Col className="d-flex align-items-center"><Link style={{"color":"white"}} to="/riskFactors">Risk Faktörleri</Link></Col>

        <Col className="d-flex align-items-center"><Link style={{"color":"white"}} to="/testInformation">Risk Değerlendirmesi Yapın</Link></Col>
        <Col className="d-flex align-items-center"><Link style={{"color":"white"}} to="/contact">İletişim</Link></Col>
        <Col className="d-flex align-items-center"><Link style={{"color":"white"}} to="/privacy">Gizlilik</Link></Col>
        
        {userTypeId==='2' || userTypeId==='3' ? (
           <Col className="d-flex align-items-center"><Link style={{"color":"white"}} to="/statistics">İstatistikler</Link></Col>
        ):(
          null
        )}
        {userLogged==='true' ? (
          <Col className="d-flex align-items-center"><Link style={{"color":"white"}} to="/profile">Profil</Link></Col>
        ):(
          null
        )}
        </Row>

        {userLogged==='true' ? (
          <button class="btn btn-dark btn-lg" type="button" onClick={() => 
            {
            sessionStorage.setItem('userName', ''); 
            sessionStorage.setItem('userSurname', ''); 
            sessionStorage.setItem('userEmail', ''); 
            sessionStorage.setItem('userPhone', ''); 
            sessionStorage.setItem('userId', ''); 
            sessionStorage.setItem('userTypeId', ''); 
            sessionStorage.setItem('isLogin', 'false'); 
            window.location.reload(false);
          }}><Link to="/">Çıkış</Link></button>
        ):(
          <button class="btn btn-dark btn-lg" type="button"><Link to="/login">Giriş</Link></button>
        )}
      </div>

      <Outlet style={{ "grid-row-start": "2" }} />
      {/* <h1>HEY</h1> */}
    </div>
  )
};

export default Header;