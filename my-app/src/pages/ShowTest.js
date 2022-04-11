import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllPartsAction,
  getAllQuestionsAction,
  createPartAction,
  deletePartAction,
  deleteQuestionAction,
} from "../tool/actions";
import AddQuestion from "../AddQuestion/AddQuestion";

const ShowTest = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);
  const [showAddNewPart, setShowAddNewPart] = useState(false);

  const [parts, setParts] = useState([]);

  const getParts = async () => {
    let result = await getAllPartsAction();
    setParts(result.sort((a,b) => {return a[1].localeCompare(b[1])}));
  };

  useEffect(async () => {
    await getParts();
  }, []);

  const [questions, setQuestions] = useState([]);
  const [isExtended, setIsExtended] = useState([]);

  const getQuestions = async () =>{
    let result = await getAllQuestionsAction();
    setQuestions(result);

    const questionNumber = result.length;
    const extended = [...Array(questionNumber)];
    for (let index = 0; index < result.length; index++) {
      extended[index] = 0;
    }
    setIsExtended(extended);
  
  }

  useEffect(async () => {
    setTimeout(() => {
      getQuestions();
    }, 300);
  }, []);

  const updateExtended = (index, val) => {
    let arr = isExtended;
    arr[index] = val;
    setIsExtended(arr);
  };

  const createPart = async (name, limit) => {
    var jsonData = {
      data: [
        {
          PartName: name,
          ScoreLimit: limit,
        },
      ],
    };
    const a = await createPartAction(jsonData);
    console.log(a);
    await getParts();
    await getQuestions();
  };

  const deletePart = async id => {
    var jsonData = {
      data: [
        {
          Id: id,
        },
      ],
    };
    const a = await deletePartAction(jsonData);
    console.log(a);
    await getParts();
    await getQuestions();
  }

  const deleteQuestion = async id => {
    var jsonData = {
      data: [
        {
          Id: id,
        },
      ],
    };
    const a = await deleteQuestionAction(jsonData);
    console.log(a);
    await getParts();
    await getQuestions();
  }

  const [show, setShow] = useState(true);

  useEffect(async () => {
    setShow(true);
  }, [JSON.stringify(isExtended)]);

  const [selectedPartId, setSelectedPartId] = useState();

  return (
    <div className="showTestPageLayout">
      <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
        <h1>Test Soruları</h1>
      </div>
      {parts.map((e, i) => (
        <div className="showTestDiv">
          <div className="partHeader">
            <h2>{e[1]}</h2>
            <div className="partButtons">
              <button
                className="partEditButton"
                onClick={(val) => console.log("clicked")}
              />
              <button 
                className="partDeleteButton" 
                onClick={async () => {deletePart(e[0]);}}
              />
            </div>
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
                      <button 
                        className="deleteButton" 
                        onClick={() => deleteQuestion(element[0])}
                      />
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
                    <button 
                      className="deleteButton" 
                      onClick={() => deleteQuestion(element[0])}
                    />
                  </div>
                </div>
              )
            ) : null
          )}
          <button
            className="addQuestionButton"
            // Update onClick function such that it will open a modal content structure
            onClick={() => {
              setSelectedPartId(e[0]);
              handleModalShow();
            }}
            style={{ "margin-top": "10px" }}
          >
            Add Question
          </button>
        </div>
      ))}

      <div className="addPartButtonDiv">
        <button
          className="addPartButton"
          // Update onClick function such that it will open a modal content structure
          onClick={() => {
            setShowAddNewPart(!showAddNewPart);
          }}
          style={{ "margin-top": "10px" }}
        >
          Add a New Part
        </button>
      </div>

      {showAddNewPart ? (
        <div className="AddPartDiv">
          <div className="AddPartInfoText">
            Here you can add a new part for the test
          </div>

          <div>
            <label>
              PartName:
              <input type="text" id="partName" placeholder="string" />
            </label>
            <label>
              ScoreLimit:
              <input type="text" id="scoreLimit" placeholder="int" />
            </label>
            <button
              onClick={() => {
                createPart(
                  document.getElementById("partName").value,
                  document.getElementById("scoreLimit").value
                );
                
              }}
            >
              Create
            </button>
          </div>
        </div>
      ) : null}
      {/* </div> */}
      <AddQuestion
        show={modalShow}
        onHide={() => {
          handleModalClose();
          getQuestions();
        }}
        partId={selectedPartId}
      />
    </div>
  );
};

export default ShowTest;
