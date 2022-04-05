import { Outlet, Link } from "react-router-dom";
import { LoginContext } from "../Helper/Context";
import { useState, useContext } from 'react';

const Header = () => {
  const{isLogin,setIsLogin} = useContext(LoginContext); 
  return (
    <div className="headerWholePage">
      <div className="header" style={{ "grid-row-start": "1", "grid-row-end": "2" }}>
        <Link to="/">Anasayfa</Link>
        <Link to="/diseaseInformationPage">Alzheimer Hastalığı</Link>
        <Link to="/riskFactors">Risk Faktörleri</Link>
        <Link to="/testInformation">Risk Değerlendirmesi Yapın</Link>
        <Link to="/contact">İletişim</Link>
        <Link to="/privacy">Gizlilik</Link>
        {isLogin ? (
          <Link to="/profile">Profil</Link>
        ):(
          null
        )}
        {isLogin ? (
          <button type="button" onClick={() => 
            {setIsLogin(false)}}><Link to="/">Çıkış</Link></button>
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