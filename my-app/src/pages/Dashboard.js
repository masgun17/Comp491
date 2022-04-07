import React, { useState, useContext } from "react";
//import { IconButton, Colors } from 'react-native-paper';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Icon from '@mui/material/Icon';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';

const Dashboard = () => {
  const [font, setFont] = useState(20);
  const increaseFont = () => {
    setFont(font+10);
  }

  const decreaseFont = () => {
    if(font-10>10){
      setFont(font-10);
    }
  }
  return (
    // <h1>Dashboard</h1>;
    <div>
      <button id="fontSizeIncrease" style={{"font-size":"20px", "margin":"0.5%"}} onClick={() => {increaseFont(false)}}><ZoomIn style={{"font-size":"40px"}}></ZoomIn>  </button>  
      <button id="fontSizeDecrease" style={{"font-size":"20px", "margin":"0.5%"}} onClick={() => {decreaseFont(true)}}><ZoomOut style={{"font-size":"40px"}}></ZoomOut> </button>        
      <div className="dashboardLayout">
          <div className="dashboardDiv1" style={{"grid-row-start": "1"}}>
            <h1 style={{"font-size": font}}>Anasayfa</h1>
        </div>
        <div className="dashboardDiv2" style={{"grid-row-start": "2"}}>
            Test Hakkında
        </div>
        <div className="dashboardDiv3" style={{"grid-row-start": "3"}}>
            Neden böyle bir test yapma ihtiyacı duyduk?
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
