import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav>
        <div className="header">

          <Link to="/">Anasayfa</Link>

          <Link to="/diseaseInformationPage">Alzheimer Hastalığı</Link>

          <Link to="/riskFactors">Risk Faktörleri</Link>

          <Link to="/testInformation">Risk Değerlendirmesi Yapın</Link>

          <Link to="/contact">İletişim</Link>

          <Link to="/privacy">Gizlilik</Link>

        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Header;