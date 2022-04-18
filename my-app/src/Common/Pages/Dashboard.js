import React, { useState, useContext } from "react";
import { FontSizeContext} from "../../Helper/Context";
//import { IconButton, Colors } from 'react-native-paper';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Icon from '@mui/material/Icon';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import "../Styles/Dashboard.css";

const Dashboard = () => {
  const{fontSize,setFontSize} = useContext(FontSizeContext) 
  const [font, setFont] = useState(20);
  return (
    // <h1>Dashboard</h1>;
    <div>   
      <div className="dashboardLayout" style={{"font-size": fontSize}}>
          <div className="dashboardDiv1" style={{"grid-row-start": "1"}}>
            <h1 style={{"font-size": fontSize*2}}>Anasayfa</h1>
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
