import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="headerWholePage">
      <div className="header" style={{ "grid-row-start": "1", "grid-row-end": "2" }}>
        <Link to="/">Anasayfa</Link>
        <Link to="/diseaseInformationPage">Alzheimer Hastalığı</Link>
        <Link to="/riskFactors">Risk Faktörleri</Link>
        <Link to="/testInformation">Risk Değerlendirmesi Yapın</Link>
        <Link to="/contact">İletişim</Link>
        <Link to="/privacy">Gizlilik</Link>
      </div>

      <Outlet style={{ "grid-row-start": "2" }} />
      {/* <h1>HEY</h1> */}
    </div>
  )
};

export default Header;