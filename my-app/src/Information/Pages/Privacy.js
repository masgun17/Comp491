import React, { useState, useEffect } from "react";
import {
  addNumAction,
  fetchDBAction,
  createPartAction,
  createQuestionAction,
  getAllQuestionsAction,
  getAllPartsAction,
  uploadUserAnswersAction,
} from "../../tool/actions";
import "../Styles/InfoPage.css";

const Privacy = () => {
  // Add Api constants
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [sum, setSum] = useState("");
  // CreatePart Api constants
  const [partName, setPartName] = useState("");
  const [scoreLimit, setScoreLimit] = useState(0);
  // CreateQuestion Api constants
  const [partid, setPartid] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [weight, setWeight] = useState(0.0);
  const [questionType, setQuestionType] = useState("");
  const [options, setOptions] = useState("");
  // GetAllPartsApi constants
  const [partData, setPartData] = useState("");
  // GetAllQuestions Api constants
  const [questionData, setQuestionData] = useState("");

  async function submitNum(n1, n2) {
    var jsonData = {
      data: [
        {
          num1: n1,
          num2: n2,
        },
      ],
    };
    const a = await addNumAction(jsonData);
    console.log(a);
    setSum(a);
  }

  async function fetchDB() {
    const a = await fetchDBAction();
    console.log(a);
  }

  async function createPart(name, limit) {
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
  }

  async function createQuestion(
    partid,
    questiontext,
    weight,
    questiontype,
    options
  ) {
    const optArray = options.split(",");
    var jsonData = {
      data: [
        {
          PartId: partid,
          QuestionText: questiontext,
          Weight: weight,
          QuestionType: questiontype,
          Options: optArray,
        },
      ],
    };
    const a = await createQuestionAction(jsonData);
    console.log(a);
  }

  async function getParts() {
    const a = await getAllPartsAction();
    console.log(a);
    setPartData(a);
  }

  async function getQuestions() {
    const a = await getAllQuestionsAction();
    console.log(a);
    setQuestionData(a);
  }

  const [assessmentSessionId, setAssessmentSessionId] = useState();
  const [questionIDsString, setQuestionIDsString] = useState();
  const [answersString, setAnswersString] = useState();

  async function uploadUserAnswer( assessmentSessionId, questionIDsString, answersString ) {
    const qid = questionIDsString.split(",");
    const ans = answersString.split(",");
    const temp = [];
    for (let index = 0; index < qid.length; index++) {
      const element = [];
      element.push(qid[index]);
      element.push(ans[index]);
      temp.push(element);
    }
    console.log(temp);
    // console.log(ans);
    var jsonData = {
      data: [
        {
          AssessmentSessionId: assessmentSessionId,
          AnswerList: temp,
        },
      ],
    };
    const a = await uploadUserAnswersAction(jsonData);
    console.log(a);
  }

  return (
    <body style={{padding: 10}}>
      <h1>Privacy</h1>

      <div>
        Add Api Test &emsp;&emsp;
        <label>
          Num1:
          <input
            type="text"
            name="name"
            id="num1"
            onChange={(e) => setNum1(e.target.value)}
          />
        </label>
        <label>
          Num2:
          <input
            type="text"
            name="name"
            id="num2"
            onChange={(e) => setNum2(e.target.value)}
          />
        </label>
        <button
          onClick={() => {
            setNum1(document.getElementById("num1").value);
            setNum2(document.getElementById("num2").value);
            submitNum(
              document.getElementById("num1").value,
              document.getElementById("num2").value
            );
            // fetchDB();
          }}
        >
          Sum
        </button>
        &emsp;&emsp;
        <input placeholder="Total" value={sum}></input>
        <div></div>
      </div>

      <br />

      <div>
        Create Part Api Test &emsp;&emsp;
        <label>
          PartName:
          <input
            type="text"
            name="name"
            placeholder="string"
            onChange={(e) => setPartName(e.target.value)}
          />
        </label>
        <label>
          ScoreLimit:
          <input
            type="text"
            name="name"
            placeholder="int"
            onChange={(e) => setScoreLimit(e.target.value)}
          />
        </label>
        <button
          onClick={() => {
            createPart(partName, scoreLimit);
          }}
        >
          Create
        </button>
      </div>

      <br />

      <div>
        Create Question Api Test &emsp;&emsp;
        <label>
          PartID:
          <input
            type="text"
            name="name"
            placeholder="int"
            onChange={(e) => setPartid(e.target.value)}
          />
        </label>
        <label>
          QuestionText:
          <input
            type="text"
            name="name"
            placeholder="string"
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </label>
        <label>
          Weight:
          <input
            type="text"
            name="name"
            placeholder="float"
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <label>
          QuestionType:
          <input
            type="text"
            name="name"
            placeholder="string"
            onChange={(e) => setQuestionType(e.target.value)}
          />
        </label>
        <label>
          Options:
          <input
            type="text"
            name="name"
            placeholder="string(s)-comma seperated"
            style={{'width' : '200px'}}
            onChange={(e) => setOptions(e.target.value)}
          />
        </label>
        <button
          onClick={() => {
            createQuestion(partid, questionText, weight, questionType, options);
          }}
        >
          Create
        </button>
      </div>

      <br />
      <div>
        <button
          onClick={() => {
            getParts();
          }}
        >
          Fetch Parts
        </button>
        <br />
        <textarea
          placeholder="Parts"
          value={partData}
          style={{ width: "80%", height: "100px" }}
        ></textarea>
      </div>

      <br />
      <div>
        <button
          onClick={() => {
            getQuestions();
          }}
        >
          Fetch Questions
        </button>
        <br />
        <textarea
          placeholder="Questions"
          value={questionData}
          style={{ width: "80%", height: "100px" }}
        ></textarea>
      </div>

      <br />
      <div>
      Upload User Answers Api Test &emsp;&emsp;
        <label>
          Assessment Session ID:
          <input
            type="text"
            name="name"
            placeholder="int"
            onChange={(e) => setAssessmentSessionId(e.target.value)}
          />
        </label>
        <label>
          Question IDs:
          <input
            type="text"
            name="name"
            placeholder="string (comma seperated)"
            onChange={(e) => setQuestionIDsString(e.target.value)}
          />
        </label>
        <label>
          Answers:
          <input
            type="text"
            name="name"
            placeholder="string (comma seperated)"
            onChange={(e) => setAnswersString(e.target.value)}
          />
        </label>
        <button
          onClick={() => {
            uploadUserAnswer(assessmentSessionId, questionIDsString, answersString);
          }}
        >
          Create
        </button>
      </div>
    </body>
  );
};

export default Privacy;
