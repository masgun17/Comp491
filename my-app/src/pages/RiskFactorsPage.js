import React, { useState, useContext } from "react";
import { FontSizeContext} from "../Helper/Context";

const RiskFactorsPage = () => {
  const{fontSize,setFontSize} = useContext(FontSizeContext) 

  return (
    // <h1>Risk Factors Page</h1>
    <div className="informationPageLayout" style={{"font-size": fontSize}}>
      <div className="informationPageDiv1" style={{ "grid-row-start": "1", "font-size": fontSize }}>
        <h1 style={{"font-size": fontSize*2}}>Risk factors</h1>
      </div>
      <div className="informationPageDiv2" style={{ "grid-row-start": "2", "font-size": fontSize, "line-height": "1.8" }}>
        &emsp;&emsp;&emsp;A risk is a probability of developing an outcome, based on the exposure to the risk factor.
        The measure of risk developed by researchers is based on averages from large samples, but may not
        always apply to each individual. It is often not possible to know if specific risk factors will have
        the same outcome for different individuals. For example, while smoking is a risk factor for lung
        cancer, not all smokers develop lung cancer. Similarly, some people who have never smoked develop
        lung cancer, but on average across large populations, we know that smoking is a very strong risk
        factor for lung cancer. <br /><br />
        &emsp;&emsp;&emsp;A comprehensive review of international research literature has identified that there are both risk
        and protective factors for Alzheimer’s disease.  The risk factors included in the ANU-ADRI are those
        for which evidence is now strong. There are other risk factors for which evidence is still being
        obtained and it is likely that these will be added to the ANU-ADRI at a later date.  Several of the
        risk factors for Alzheimer’s disease are also risk factors for vascular dementia. Identified
        protective and risk factors for Alzheimer’s disease include: <br /><br />

        <div style={{"align-self": "flex-start"}}>
          <h3 style={{"font-size": fontSize}}>Protective factors</h3>
          <ul>
            <li>
              Light to moderate alcohol consumption
            </li>
            <li>
              High physical activity
            </li>
            <li>
              Cognitive activity
            </li>
            <li>
              High fish intake
            </li>
          </ul>
        </div>

        <div style={{"align-self": "flex-start"}}>
          <h3 style={{"font-size": fontSize}}>Risk factors</h3>
          <ul>
            <li>
              Increasing age
            </li>
            <li>
              Female gender
            </li>
            <li>
              Low education
            </li>
            <li>
              Overweight and obese BMI in mid-life
            </li>
            <li>
              Diabetes
            </li>
            <li>
              Depression
            </li>
            <li>
              High serum cholesterol in mid-life
            </li>
            <li>
              Traumatic brain injury
            </li>
            <li>
              Current Smoking
            </li>
            <li>
              Low social engagement
            </li>
            <li>
              Pesticide exposure
            </li>
          </ul>
        </div>


      </div>
    </div>
  );
};

export default RiskFactorsPage;