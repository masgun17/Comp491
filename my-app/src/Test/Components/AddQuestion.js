import React, { useEffect, useState } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import "../Styles/AddQuestion.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";
import { createQuestionAction } from "../../tool/actions";
import { toast } from 'react-toastify';

const AddQuestion = ({ partId, ...props }) => {
  
  const [freeText, setFreeText] = useState(true); // boolean to select whether the question will be free-text question or multi-select question
  const [optionNo, setOptionNo] = useState(0);  // default number of options for multi-select questions
  const [options, setOptions] = useState([]);   // array with size of optionNo to hold options
  const [showOptions, setShowOptions] = useState(false); // boolean, which enables input areas for options
  const [weight, setWeight] = useState(0);  // not used
  toast.configure() // used for confirmation popup

  const handleKeyDown = (event) => {  // enter key behavior for optionNo area
    if (event.key === "Enter") {
      setOptionNo(event.target.value);
    }
  };
  useEffect(async () => { // creates an array with size of optionNo, filled with "" as default value
    const arr = Array.from({ length: optionNo }).fill("");
    setOptions(arr);
    setShowOptions(true);
  }, [optionNo]);


  async function createQuestion() { // main function that sends request to backend via API call to create question with entered values
    const questionText = document.getElementById("questionText").value; // fetch entered values
    const weight = document.getElementById("questionWeight").value;// fetch entered values
    const questionType = freeText ? "free-text" : "multi-select";// fetch entered values
    const optArray = [];
    if (questionType === "multi-select") {
      for (let index = 0; index < optionNo; index++) {
        const opt = document.getElementById(index).value;
        console.log(opt);
        optArray.push(opt);// fetch entered values
      }
    }

    var jsonData = {
      data: [
        {
          PartId: partId, // supplied from Show Test screen
          QuestionText: questionText, // fetched above
          Weight: weight,
          QuestionType: questionType,
          Options: optArray,
        },
      ],
    };
    const a = await createQuestionAction(jsonData); // API call
    console.log(a);
    if (a === 'Question added Successfully') {
      toast.success('Soru Ba??ar??yla Eklendi!',  // success popup
        { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
    }

  }

  return (
    <Modal
      {...props}
      centered
      contentClassName="custom-modal-content"
      dialogClassName="custom-modal-dialogue"
      onExit={() => {
        console.log("clicked");
        setShowOptions(false);
        setOptions(["", ""]);
        setFreeText(true);
        setOptionNo(0);
      }}
    >
      <div className="modal-grid">
        <h className="modal-header">Yeni Soru Ekle</h>
        <div className="modal-question-type">
          <Dropdown className="modal-dropdown">
            <Dropdown.Toggle className="modal-toggle">
              Soru tipi se??iniz...
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                id="multi-select"
                onClick={() => {
                  setFreeText(false);
                }}
              >
                ??oktan se??meli soru
              </Dropdown.Item>
              <Dropdown.Item
                id="free-text"
                onClick={() => {
                  setFreeText(true);
                  setShowOptions(false);
                }}
              >
                A????k u??lu soru
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <textarea
            id='questionText'
            className="questionDescription"
            placeholder="Soru a????klamas?? giriniz..."
          />
          <input
            className="questionWeight"
            id='questionWeight'
            placeholder="Sorunun algoritma de??i??ken ad??n?? giriniz..."
            onChange={(e) => {
              setWeight(e);
            }}
          />
        </div>

        <div className="modal-question-answers">
          {!freeText && (
            <input
              id="optionNo"
              className="optionNo"
              placeholder="Eklemek istedi??iniz soru ????kk?? say??s??n?? giriniz... (Say??y?? yaz??ktan sonra enter tu??una bas??n??z)"
              onKeyDown={handleKeyDown}
            />
          )}
          {showOptions &&
            options.map((item, index) => (
              <input
                className="optionNo"
                id={index}
                placeholder="Soru ????kk??n?? giriniz..."
              />
            ))}
        </div>

        {/* <button className="add-question" onClick={createQuestion} >Soru Ekle</button> */}
        <div class="modal-footer">
          <button type="button" className="add-question" onClick={createQuestion}>Soru Ekle</button>
          <button type="button" class="add-question" data-dismiss="modal" onClick={props.onHide}>Kapat</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddQuestion;
