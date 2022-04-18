import React from 'react'
import "../Styles/Approve.css";

const Approve = props => {
    return (
      <div className="approve-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      </div>
    );
  };
  
  export default Approve;