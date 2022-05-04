import React from 'react'
import "../Styles/Approve.css";

const Approve = props => {
    return (
      <div className="approve-box" style={{"margin-top":"10%"}}>
        <div className="box">
          <span className="close-icon" style={{"margin-top":"10%"}} onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      </div>
    );
  };
  
  export default Approve;