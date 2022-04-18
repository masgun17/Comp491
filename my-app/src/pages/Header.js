import { Outlet, Link } from "react-router-dom";
import { FontSizeContext} from "../Helper/Context";
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import React, { useState, useContext } from "react";

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
        <button id="fontSizeIncrease" style={{"font-size":"20px", "margin":"0.5%"}} onClick={() => {increaseFont(false)}}><ZoomIn style={{"font-size":"40px"}}></ZoomIn>  </button>  
        <button id="fontSizeDecrease" style={{"font-size":"20px", "margin":"0.5%"}} onClick={() => {decreaseFont(true)}}><ZoomOut style={{"font-size":"40px"}}></ZoomOut> </button>     
        <Link to="/">Anasayfa</Link>
        <Link to="/diseaseInformationPage">Alzheimer Hastalığı</Link>
        <Link to="/riskFactors">Risk Faktörleri</Link>
        <Link to="/testInformation">Risk Değerlendirmesi Yapın</Link>
        <Link to="/contact">İletişim</Link>
        <Link to="/privacy">Gizlilik</Link>
        {userTypeId==='2' || userTypeId==='3' ? (
           <Link to="/statistics">İstatistikler</Link>
        ):(
          null
        )}
        {userLogged==='true' ? (
          <Link to="/profile">Profil</Link>
        ):(
          null
        )}
        {userLogged==='true' ? (
          <button type="button" onClick={() => 
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
          <button type="button"><Link to="/login">Giriş</Link></button>
        )}
        
      </div>

      <Outlet style={{ "grid-row-start": "2" }} />
      {/* <h1>HEY</h1> */}
    </div>
  )
};

export default Header;