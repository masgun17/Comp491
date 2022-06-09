import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddQuestion from "../Components/AddQuestion";
import {
  getAllPartsAction,
  getAllQuestionsAction,
  createPartAction,
  deletePartAction,
  deleteQuestionAction,
} from "../../tool/actions";
// import AddQuestion from "../Components/AddQuestion";
import "../Styles/ShowTest.css";

const ShowTest = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);
  const [showAddNewPart, setShowAddNewPart] = useState(false);
  const [confirmDeleteShow, setConfirmDeleteShow] = useState(false);
  const [currentQ, setCurrentQ] = useState('');

  const [parts, setParts] = useState([]);

  const getParts = async () => {
    let result = await getAllPartsAction();
    setParts(
      result.sort((a, b) => {
        return a[1].localeCompare(b[1]);
      })
    );
  };

  useEffect(async () => {
    await getParts();
  }, []);

  const [questions, setQuestions] = useState([]);
  const [isExtended, setIsExtended] = useState([]);

  const getQuestions = async () => {
    let result = await getAllQuestionsAction();
    setQuestions(result);

    const questionNumber = result.length;
    const extended = [...Array(questionNumber)];
    for (let index = 0; index < result.length; index++) {
      extended[index] = 0;
    }
    setIsExtended(extended);
  };

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
          PartDescription: limit,
        },
      ],
    };
    const a = await createPartAction(jsonData);
    console.log(a);
    await getParts();
    await getQuestions();
  };

  const deletePart = async (id) => {
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
  };

  const deleteQuestion = async (id) => {
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
  };

  const [show, setShow] = useState(true);

  useEffect(async () => {
    setShow(true);
  }, [JSON.stringify(isExtended)]);

  const [selectedPartId, setSelectedPartId] = useState();

  return (
    <div className="showTestPageLayout">
      <div className="ShowTestDiv1" style={{ "grid-row-start": "1" }}>
        <h1>Test Soruları</h1>
      </div>
      {parts.map((e, i) => (
        <div className="showTestDiv">
          <div className="partHeader">
            <h2>{e[1]}</h2>
            <div className="partButtons">
              <button
                className="partDeleteButton"
                onClick={async () => {
                  deletePart(e[0]);
                }}
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
                        className="deleteButton"
                        onClick={() => deleteQuestion(element[0])}
                      />
                    </div>
                  </div>
                  <div className="questionDetailsChoicesRow">
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
                      className="deleteButton"
                      // onClick={() => deleteQuestion(element[0])}
                      onClick={() => {setConfirmDeleteShow(true); setCurrentQ(element[0]);}}
                    />
                  </div>
                </div>
              )
            ) : null
          )}
          {confirmDeleteShow && (
            <Modal
              centered
              contentClassName="confirmDeleteModal"
              // contentClassName="custom-modal-content"
              // dialogClassName="custom-modal-dialogue"
              show={confirmDeleteShow}
            >
              <div className='confirmText'>Bu soruyu silmek istediğinize emin misiniz?</div>
              <div className="confirmPopup">
                <button className='confirmModalButton' type="button" onClick={() => {setConfirmDeleteShow(false);}}>Vazgeç</button>
                <button className='confirmModalButton' type="button" onClick={() => {setConfirmDeleteShow(false); deleteQuestion(currentQ)}}>Sil</button>
              </div>
            </Modal>
          )}
          <button
            class="btn btn-primary btn-lg btn-block"
            // className="addQuestionButton"
            // Update onClick function such that it will open a modal content structure
            onClick={() => {
              setSelectedPartId(e[0]);
              handleModalShow();
            }}
            style={{ "margin-top": "10px" }}
          >
            Soru Ekle
          </button>
        </div>
      ))}
      <div className="addPartButtonDiv">
        <button
          className="btn btn-primary btn-lg btn-block"
          // Update onClick function such that it will open a modal content structure
          onClick={() => {
            setShowAddNewPart(!showAddNewPart);
          }}
          style={{ "margin-top": "10px", "margin-bottom": "10px" }}
        >
          Yeni Part Ekle
        </button>
      </div>

      {showAddNewPart ? (
        <div className="AddPartDiv">
          <div className="AddPartInfoText">
            Buradan yeni part ekleyebilirsiniz!
          </div>

          <div>
            <label>
              Part Adı:
              <input
                type="text"
                id="partName"
                placeholder="Part Adı"
                style={{ "margin-right": "10px" }}
              />
            </label>
            <label>
              Part Açıklaması:
              <input
                type="text"
                id="scoreLimit"
                placeholder="Part Açıklaması"
                style={{ "margin-right": "10px" }}
              />
            </label>
            <button
              class="btn btn-primary btn-block"
              onClick={() => {
                createPart(
                  document.getElementById("partName").value,
                  document.getElementById("scoreLimit").value
                );
                setShowAddNewPart(!showAddNewPart);
              }}
            >
              Ekle
            </button>
          </div>
        </div>
      ) : null}

      <AddQuestion
        show={modalShow}
        onHide={() => {
          handleModalClose();
          getQuestions();
        }}
        partId={selectedPartId}
        //handleClose={handleModalClose()}
      />
    </div>
  );
};

export default ShowTest;
