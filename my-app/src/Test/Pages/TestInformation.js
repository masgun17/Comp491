import { useNavigate } from "react-router-dom";
import "../Styles/TestInformation.css";

const TestInformationPage = () => {
  const navigate = useNavigate();
  return (
    // <h1>Test Information Page</h1>
    <div className="testInformationPageLayout">
      <div className="testInfoDiv1" style={{ "grid-row-start": "1" }}>
        <h1>Test Hakkında</h1>
      </div>
      <div className="testInfoDiv2" style={{ "grid-row-start": "2", "font-size": "20px", "line-height": "1.8" }}>
        &emsp;&emsp;&emsp;The ANU-ADRI is an evidence-based, validated tool aimed at assessing individual exposure to risk factors
        known to be associated with an increased risk of developing Alzheimer's disease in late-life, that is,
        over the age of 60 years. <br /><br />

        &emsp;&emsp;&emsp;The ANU-ADRI is intended to provide a systematic individualised assessment and report on Alzheimer's
        disease risk factor exposure. It may be useful for individuals who wish to know their risk profile and
        areas where they can reduce their risk. It may also be useful to clinicians who would like their patients
        to record their current risk profile for discussion at their next medical appointment. The ANU-ADRI is
        also used in research projects that aim to evaluate methods of reducing risk of Alzheimer’s disease.
      </div>
      <div className="testInformationPageButtonLayout" style={{ "grid-row-start": "3" }}>
        {/* <Link to="/contact">İletişim</Link>
        <Link to="/privacy">Gizlilik</Link> */}
        <button className="showTestButton" onClick={() => navigate("/showTest")}> Show Test </button>
        <button className="showTestButton" onClick={() => navigate("/takeTest")}> Take Test </button>
      </div>
    </div>
  );
};

export default TestInformationPage;