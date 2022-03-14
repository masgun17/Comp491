import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="headerWholePage">
      <div className="header">
        <Link to="/">Anasayfa</Link>
        <Link to="/diseaseInformationPage">Alzheimer Hastalığı</Link>
        <Link to="/riskFactors">Risk Faktörleri</Link>
        <Link to="/testInformation">Risk Değerlendirmesi Yapın</Link>
        <Link to="/contact">İletişim</Link>
        <Link to="/privacy">Gizlilik</Link>
      </div>

      <Outlet />
      {/* <h1>HEY</h1> */}
    </div>
  )
};

export default Header;