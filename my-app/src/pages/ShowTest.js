import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPartsAction, getAllQuestionsAction } from "../tool/actions";
import AddQuestion from "./AddQuestion";
// import Modal from "react-bootstrap/Modal";
// import "bootstrap/dist/css/bootstrap.min.css";

const ShowTest = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const [parts, setParts] = useState([]);

  useEffect(async () => {
    let result = await getAllPartsAction();
    if (result) {
      while (result === "Bad Request ") {
        result = await getAllPartsAction();
      }
      setParts(result);
    }
  }, []);

  const [questions, setQuestions] = useState([]);
  const [isExtended, setIsExtended] = useState([]);

  useEffect(async () => {
    let result = await getAllQuestionsAction();
    if (result) {
      while (result === "Bad Request ") {
        result = await getAllQuestionsAction();
      }
      setQuestions(result);

      const questionNumber = result.length;
      const extended = [...Array(questionNumber)];
      for (let index = 0; index < result.length; index++) {
        extended[index] = 0;
      }
      setIsExtended(extended);
    }
  }, []);

  const updateExtended = (index, val) => {
    let arr = isExtended;
    arr[index] = val;
    setIsExtended(arr);
  };

  const [show, setShow] = useState(true);

  useEffect(async () => {
    setShow(true);
  }, [JSON.stringify(isExtended)]);

  return (
    <div className="showTestPageLayout">
      <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
        <h1>Test Soruları</h1>
      </div>
      {parts.map((e, i) => (
        <div className="showTestDiv">
          <div className="partHeader">
            <h2>{e[1]}</h2>
          </div>
          {questions.map((element, index) =>
            element[1] === e[0] ? (
              isExtended[index] ? (
                <div
                  className="questionDetailsOnClick"
                  onClick={(val) => {
                    updateExtended(index, 0);
                    setShow(false);
                  }}
                >
                  <div className="questionDetailsTopRow">
                    <div style={{ "margin-left": "10px" }}>{element[2]}</div>
                    <div className="questionButtonLayout" onClick={(val) => {}}>
                      <button
                        className="editButton"
                        onClick={(val) => console.log("clicked")}
                      />
                      <button className="deleteButton" />
                    </div>
                  </div>
                  <div className="questionDetailsChoicesRow">
                    <div>Choices:</div>
                    <div className="questionDetailsChoices">
                      {/* TODO: Get choices from db */}
                      {JSON.parse(element[5]).map((choices, index2) => (
                        <div>{choices}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="questionDetails"
                  onClick={(val) => {
                    updateExtended(index, 1);
                    setShow(false);
                  }}
                >
                  <div style={{ "margin-left": "10px" }}>{element[2]}</div>
                  <div className="questionButtonLayout">
                    <button
                      className="editButton"
                      onClick={(val) => console.log("clicked")}
                    />
                    <button className="deleteButton" />
                  </div>
                </div>
              )
            ) : null
          )}
          <button
            className="addQuestionButton"
            // Update onClick function such that it will open a modal content structure
            onClick={() => {
              handleModalShow();
            }}
            style={{ "margin-top": "10px" }}
          >
            Add Question
          </button>
        </div>
      ))}
      {/* </div> */}
      <AddQuestion
        show={modalShow}
        onHide={() => {
          handleModalClose();
        }}
      />
    </div>
  );
};

export default ShowTest;
