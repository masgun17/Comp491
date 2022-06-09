import React from 'react'
import "../Styles/Approve.css";
// This component is used to show Approve modal in the sign-up page when it is clicked.
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