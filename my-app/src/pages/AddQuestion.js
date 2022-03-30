import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AddQuestion = ({ ...props }) => {
  return (
    <Modal {...props} size="xl" centered>
      <div className="modal-grid">
        <h className="modal-header">Add a New Question</h>

        <div className="modal-question-type"></div>

        <h>hey3</h>

        <button className="add-question">Add Question</button>
      </div>
    </Modal>
  );
};

export default AddQuestion;
