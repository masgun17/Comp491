import { useEffect, useState } from "react";
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
import "../Styles/ShowTest.css";

const ShowTest = () => {
  const [modalShow, setModalShow] = useState(false); // flag value - show the AddQuestion popup, or not
  const handleModalClose = () => setModalShow(false); // pop up close method for AddQuestion
  const handleModalShow = () => setModalShow(true); // pop up open method for AddQuestion
  const [showAddNewPart, setShowAddNewPart] = useState(false); // flag for add new part division
  const [confirmDeleteShow, setConfirmDeleteShow] = useState(false); // flag value - show the delete confirmation popup, or not
  const [currentQ, setCurrentQ] = useState(""); // current question info for deletion

  const [parts, setParts] = useState([]); // part infos

  const getParts = async () => {
    // API call that fetches part infos
    let result = await getAllPartsAction();
    setParts(
      result.sort((a, b) => {
        // sort them so that they will be in order
        return a[1].localeCompare(b[1]);
      })
    );
  };

  useEffect(async () => {
    // call getParts at page loading
    await getParts();
  }, []);

  const [questions, setQuestions] = useState([]); // question array
  const [isExtended, setIsExtended] = useState([]); // array of booleans to keep track of which question is clicked and extended

  const getQuestions = async () => {
    let result = await getAllQuestionsAction(); // fetch questions from db
    setQuestions(result);

    const questionNumber = result.length;
    const extended = [...Array(questionNumber)]; // create an extended array with the size of question array and populate it with 0s
    for (let index = 0; index < result.length; index++) {
      extended[index] = 0;
    }
    setIsExtended(extended);
  };

  useEffect(async () => {
    // call getQuestions with small delay on page loading
    setTimeout(() => {
      getQuestions();
    }, 300);
  }, []);

  const updateExtended = (index, val) => {
    // function to update specific index of isExtended array
    let arr = isExtended;
    arr[index] = val;
    setIsExtended(arr);
  };

  const createPart = async (name, limit) => {
    // API call to create a new part with given parameters
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
    await getParts(); // call those API calls to fetch newly created part
    await getQuestions();
  };

  const deletePart = async (id) => {
    // API call to delete a part
    var jsonData = {
      data: [
        {
          Id: id,
        },
      ],
    };
    const a = await deletePartAction(jsonData);
    console.log(a);
    await getParts(); // call those API calls to fetch parts again
    await getQuestions();
  };

  const deleteQuestion = async (id) => {
    // API call to delete a question
    var jsonData = {
      data: [
        {
          Id: id,
        },
      ],
    };
    const a = await deleteQuestionAction(jsonData);
    console.log(a);
    await getParts(); // call those API calls to fetch questions again
    await getQuestions();
  };

  const [show, setShow] = useState(true); // use state for extended state

  useEffect(async () => {
    setShow(true);
  }, [JSON.stringify(isExtended)]);

  const [selectedPartId, setSelectedPartId] = useState(); // selected part id info to pass into AddQuestion popup

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
                      onClick={() => {
                        setConfirmDeleteShow(true);
                        setCurrentQ(element[0]);
                      }}
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
              <div className="confirmText">
                Bu soruyu silmek istediğinize emin misiniz?
              </div>
              <div className="confirmPopup">
                <button
                  className="confirmModalButton"
                  type="button"
                  onClick={() => {
                    setConfirmDeleteShow(false);
                  }}
                >
                  Vazgeç
                </button>
                <button
                  className="confirmModalButton"
                  type="button"
                  onClick={() => {
                    setConfirmDeleteShow(false);
                    deleteQuestion(currentQ);
                  }}
                >
                  Sil
                </button>
              </div>
            </Modal>
          )}
          <button
            class="btn btn-primary btn-lg btn-block"
            // className="addQuestionButton"
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
