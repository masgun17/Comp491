import { Outlet, Link, Navigate } from "react-router-dom";
import { FontSizeContext } from "../../Helper/Context";
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import React, { useState, useContext } from "react";
import "../Styles/Header.css"
import { Row, Col, Grid } from 'react-bootstrap';

const Header = (props) => {
  let userLogged = sessionStorage.getItem('isLogin'); //Whether the user is logged in or not
  let userTypeId = sessionStorage.getItem('userTypeId') //Getting user's type id
  const { fontSize, setFontSize } = useContext(FontSizeContext) //To share the font-size of all of the text between the components and pages

  const increaseFont = () => { //Increasing the font-size of every component from the fontSizeIncrease button
    if (fontSize + 10 < 50) {
      setFontSize(fontSize + 10);
    }
  }

  const decreaseFont = () => { //Decreasing the font-size of every component from the fontSizeDecrease button
    if (fontSize - 10 > 10) {
      setFontSize(fontSize - 10);
    }
  }

  return (
    <div className="headerWholePage">
      <div className="header" style={{ "grid-row-start": "1", "grid-row-end": "2" }}>
        <Row style={{ "width": "100%" }}>
        <Col className="d-flex justify-content-center" style={{ "align-items": "center" }}>

          <div className="btn-group">
              <button class="btn btn-dark btn-lg" id="fontSizeIncrease" style={{ "font-size": "20px", "margin": "0.5%" }} onClick={() => { increaseFont(false) }}><ZoomIn style={{ "font-size": "40px" }}></ZoomIn>  </button>
              <button class="btn btn-dark btn-lg" id="fontSizeDecrease" style={{ "font-size": "20px", "margin": "0.5%" }} onClick={() => { decreaseFont(true) }}><ZoomOut style={{ "font-size": "40px" }}></ZoomOut> </button>
          </div>
          </Col>

          <Col className="d-flex justify-content-center" style={{ "align-items": "center" }}><Link style={{ "color": "white" }} to="/">Anasayfa</Link></Col>
          <Col className="d-flex justify-content-center" style={{ "align-items": "center" }}><Link style={{ "color": "white" }} to="/diseaseInformationPage">Demans</Link></Col>
          <Col className="d-flex justify-content-center" style={{ "align-items": "center" }}><Link style={{ "color": "white" }} to="/riskFactors">Risk Faktörleri</Link></Col>

          <Col className="d-flex justify-content-center" style={{ "align-items": "center" }}><Link style={{ "color": "white" }} to="/testInformation">Risk Değerlendirmesi Yapın</Link></Col>
          <Col className="d-flex justify-content-center" style={{ "align-items": "center" }} ><Link style={{ "color": "white" }} to="/contact">İletişim</Link></Col>
          <Col className="d-flex justify-content-center" style={{ "align-items": "center" }}><Link style={{ "color": "white" }} to="/privacy">Gizlilik</Link></Col>

          {userTypeId === '2' || userTypeId === '3' ? (
            <Col className="d-flex justify-content-center" style={{ "align-items": "center" }}><Link style={{ "color": "white" }} to="/statistics">İstatistikler</Link></Col>
          ) : (
            null
          )}
          {userLogged === 'true' ? (
            <Col className="d-flex justify-content-center" style={{ "align-items": "center" }}><Link style={{ "color": "white" }} to="/profile">Profil</Link></Col>
          ) : (
            null
          )}

          {userLogged === 'true' ? (
            <Col className="d-flex justify-content-center" style={{ "align-items": "center" }}>
              <button class="btn btn-dark btn-lg" style={{ "font-size": "30px" }} type="button" onClick={() => {
                sessionStorage.setItem('userName', '');
                sessionStorage.setItem('userSurname', '');
                sessionStorage.setItem('userEmail', '');
                sessionStorage.setItem('userPhone', '');
                sessionStorage.setItem('userId', '');
                sessionStorage.setItem('userTypeId', '');
                sessionStorage.setItem('isLogin', 'false');
                window.location.reload(false);
              }}><Link to="/">Çıkış</Link></button></Col>
          ) : (
            <Col className="d-flex justify-content-center" style={{ "align-items": "center" }}>
              <button class="btn btn-dark btn-lg" style={{ "font-size": "30px" }} type="button"><Link to="/login">Giriş</Link></button>
            </Col>
          )}
        </Row>

      </div>

      <Outlet style={{ "grid-row-start": "2" }} />
    </div>
  )
};

export default Header;