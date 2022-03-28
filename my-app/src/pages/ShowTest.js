import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowTest = () => {
  const navigate = useNavigate();

  const [parts, setParts] = useState([]);

  useEffect(async () => {
    // TODO
    // const result = await getPartsAction();
    // setParts(result);
    setParts([...Array(5)]);
  }, [])

  const [questions, setQuestions] = useState([]);
  const [isExtended, setIsExtended] = useState([]);

  useEffect(async () => {
    // TODO
    // const result = await getQuestionsAction();
    // setQuestions(result);
    let partArray = [...Array(5)];
    for (let index = 0; index < partArray.length; index += 1) {
      let questionsPerPart = [...Array(10)];
      partArray[index] = questionsPerPart;
    }
    setQuestions(partArray);


    let arr = [...partArray];
    for (let index = 0; index < arr.length; index++) {
      for (let index2 = 0; index2 < arr[index].length; index2++) {
        arr[index][index2] = 0;
      }
    }
    setIsExtended(arr);
  }, [])

  const updateExtended = (i, index, val) => {
    let arr = isExtended;
    arr[i][index] = val;
    setIsExtended(arr);
  }

  const [show, setShow] = useState(true);

  useEffect(async () => {
    setShow(true);
  }, [JSON.stringify(isExtended)])

  return (
    <div className="showTestPageLayout">
      <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
        <h1>Test Soruları</h1>
      </div>
      {parts.map((e, i) => (
        <div className="showTestDiv" >
          <div className="partHeader">
            <h2>Part {i + 1}</h2>
          </div>
          {questions[i].map((element, index) => (
            isExtended[i][index] ?
              <div className="questionDetailsOnClick" onClick={val => { updateExtended(i, index, 0); setShow(false); }}>
                <div className="questionDetailsTopRow">
                  <div style={{ 'margin-left': '10px' }}>Question {index + 1}</div>
                  <div className="questionButtonLayout" onClick={val => {}}>
                    <button className="editButton" onClick={val => console.log("clicked")} />
                    <button className="deleteButton" />
                  </div>
                </div>
                <div className="questionDetailsChoicesRow">
                  <div>
                    Choices:
                  </div>
                  <div className="questionDetailsChoices">
                    {/* TODO: Get choices from db */}
                    <div>
                      Choice 1
                    </div>
                    <div>
                      Choice 2
                    </div>
                    <div>
                      Choice 3
                    </div>
                    <div>
                      Choice 4
                    </div>
                    <div>
                      Choice 5
                    </div>
                  </div>

                </div>

              </div>
              :
              <div className="questionDetails" onClick={val => { updateExtended(i, index, 1); setShow(false); }}>
                <div style={{ 'margin-left': '10px' }}>Question {index + 1}</div>
                <div className="questionButtonLayout" >
                  <button className="editButton" onClick={val => console.log("clicked")}/>
                  <button className="deleteButton" />
                </div>

              </div>
          )
          )}
          <button
            className="addQuestionButton"
            // Update onClick function such that it will open a modal content structure
            onClick={() => navigate("/showTest")}
            style={{ 'margin-top': '10px' }}
          >
            Add Question
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShowTest;