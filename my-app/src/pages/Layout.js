import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <span style={{"display": "grid", "grid-template-columns": "auto auto auto auto auto auto", "padding": "30px"}}>
          <li>
            <Link to="/">Anasayfa</Link>
          </li>
          <li>
            <Link to="/diseaseInformationPage">Alzheimer Hastalığı</Link>
          </li>
          <li>
            <Link to="/riskFactors">Risk Faktörleri</Link>
          </li>
          <li>
            <Link to="/testInformation">Risk Değerlendirmesi Yapın</Link>
          </li>
          <li>
            <Link to="/contact">İletişim</Link>
          </li>
          <li>
            <Link to="/privacy">Gizlilik</Link>
          </li>
        </span>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;