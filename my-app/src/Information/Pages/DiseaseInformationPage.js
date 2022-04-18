import React, { useState, useContext } from "react";
import { FontSizeContext} from "../../Helper/Context";
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import "../Styles/InfoPage.css";

const DiseaseInformationPage = () => {
  const{fontSize,setFontSize} = useContext(FontSizeContext) 

  
  return (
    // <h1>Disease Information Page</h1>
    <div>
    
    <div className="informationPageLayout">
        <div className="informationPageDiv1" style={{"grid-row-start": "1"}}>
            <h1 style={{"font-size": fontSize*2}}>Alzheimer's disease and Dementia facts & figures</h1>
        </div>
        <div className="informationPageDiv2" style={{"grid-row-start": "2", "font-size": "20px", "line-height": "1.8"}}>
          <ul style={{"font-size": fontSize}}>
            <li>
            Dementia is not a normal part of ageing
            </li>
            <li>
            The term 'dementia' and 'Alzheimer's disease' do not have the same meaning. Dementia is an umbrella term describing a syndrome associated with more than 100 different diseases affecting the brain (Alzheimer's disease is one of them)
            </li>
            <li>
            The most common cause of dementia is Alzheimer's disease (approximately 50-70 per cent of all dementia cases)
            </li>
            <li>
            Dementia was the third leading cause of death in Australia in 2010
            </li>
            <li>
            298,000 Australians and 35,600,000 individuals worldwide live with dementia, which is approximately 1 per cent of the Australian population and 0.5 per cent of the global population
            </li>
            <li>
            The prevalence of dementia is projected to reach 900,000 by 2050
            </li>
            <li>
            Generally, dementia is associated with a loss of mental or cognitive function
            </li>
            <li>
            Adults younger than 65 years old may also develop dementia
            </li>
            <li>
            Reduction in risk factors and increase in protective factors may reduce chance of developing dementia
            </li>
            <li>
            A 10 - 25 per cent reduction in risk factors can potentially prevent as many as 1.1 - 3.0 million cases worldwide.
            </li>
          </ul>
        </div>
      </div>
      </div>
  );
};

export default DiseaseInformationPage;