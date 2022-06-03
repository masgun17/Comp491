import React, { useEffect, useState } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import "../Styles/AddQuestion.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom";
import { createQuestionAction } from "../../tool/actions";
import { toast } from 'react-toastify';

const AddQuestion = ({ partId, ...props }) => {
  
  const [freeText, setFreeText] = useState(true);
  const [optionNo, setOptionNo] = useState(0);
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [weight, setWeight] = useState(0);
  toast.configure()

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setOptionNo(event.target.value);
    }
  };
  useEffect(async () => {
    const arr = Array.from({ length: optionNo }).fill("");
    setOptions(arr);
    setShowOptions(true);
  }, [optionNo]);


  async function createQuestion() {
    const questionText = document.getElementById("questionText").value;
    const weight = document.getElementById("questionWeight").value;
    const questionType = freeText ? "free-text" : "multi-select";
    const optArray = [];
    if (questionType === "multi-select") {
      for (let index = 0; index < optionNo; index++) {
        const opt = document.getElementById(index).value;
        console.log(opt);
        optArray.push(opt);
      }
    }

    var jsonData = {
      data: [
        {
          PartId: partId,
          QuestionText: questionText,
          Weight: weight,
          QuestionType: questionType,
          Options: optArray,
        },
      ],
    };
    const a = await createQuestionAction(jsonData);
    console.log(a);
    if (a === 'Question added Successfully') {
      toast.success('Soru Başarıyla Eklendi!',
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
              Soru tipi seçiniz...
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                id="multi-select"
                onClick={() => {
                  setFreeText(false);
                }}
              >
                Çoktan seçmeli soru
              </Dropdown.Item>
              <Dropdown.Item
                id="free-text"
                onClick={() => {
                  setFreeText(true);
                  setShowOptions(false);
                }}
              >
                Açık uçlu soru
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <textarea
            id='questionText'
            className="questionDescription"
            placeholder="Soru açıklaması giriniz..."
          />
          <input
            className="questionWeight"
            id='questionWeight'
            placeholder="Sorunun algoritma değişken adını giriniz..."
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
              placeholder="Eklemek istediğiniz soru şıkkı sayısını giriniz... (Sayıyı yazıktan sonra enter tuşuna basınız)"
              onKeyDown={handleKeyDown}
            />
          )}
          {showOptions &&
            options.map((item, index) => (
              <input
                className="optionNo"
                id={index}
                placeholder="Soru şıkkını giriniz..."
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
