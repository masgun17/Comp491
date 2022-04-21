import { useEffect, useState } from "react";
import {
  getAllPartsAction,
  getAllQuestionsAction,
  createAssessmentSessionAction,
  uploadUserAnswersAction,
} from "../../tool/actions";
import PartInformation from "../Components/PartInformation";
import QuestionBody from "../Components/QuestionBody";
import "../Styles/TakeTest.css";

const TakeTest = () => {
  const [id, setId] = useState(null);
  const [currentAssessmentSession, setCurrentAssessmentSession] = useState(0);
  const [incomingAnswer, setIncomingAnswer] = useState("");
  const [qID, setQid] = useState();

  // useEffect(async() =>{
  //   console.log(incomingAnswer, "answer in parent");
  // }, [incomingAnswer]);

  const createAssessmentSession = async () => {
    var jsonData = {
      data: [
        {
          UserId: id,
        },
      ],
    };
    const a = await createAssessmentSessionAction(jsonData);
    setCurrentAssessmentSession(a);
  };

  useEffect(async () => {
    setId(sessionStorage.getItem("userId"));
    if (id !== null && id !== "") {
      // null check / "" check
      // await createAssessmentSession();
      setTimeout(() => {
        createAssessmentSession();
      }, 300);
    }
  }, [id]);

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

  const getQuestions = async () => {
    let result = await getAllQuestionsAction();
    setQuestions(result);
  };

  useEffect(async () => {
    setTimeout(() => {
      getQuestions();
    }, 100);
  }, []);

  const [firstPage, setFirstPage] = useState(true);
  const [showPartInfo, setShowPartInfo] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [partIndex, setPartIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentPartQuestionCount, setCurrentPartQuestionCount] = useState(0);
  const [currentQuestionArray, setCurrentQuestionArray] = useState([]);

  // TODO: Styling

  // Remark: Now we are fetching all questions from db upon entering the test and filter them part by part on frontend.
  // In case we encounter performance issues in the future, we might create new API calls to fetch questions part by part.

  const nextClick = () => {
    if (firstPage) {
      setFirstPage(false);
      setShowPartInfo(true);
    } else if (showPartInfo) {
      setShowPartInfo(false);
      const partId = parts[partIndex][0];
      let count = 0;
      let temp = [];
      for (let index = 0; index < questions.length; index++) {
        if (questions[index][1] === partId) {
          temp.push(questions[index]);
          count += 1;
        }
      }
      setCurrentQuestionArray(temp);
      setCurrentPartQuestionCount(count);
      setQuestionIndex(0);
      setShowQuestions(true);
    } else {
      if (questionIndex + 1 >= currentPartQuestionCount) {
        setShowQuestions(false);
        setShowPartInfo(true);
        setQuestionIndex(0);
        setPartIndex(partIndex + 1);
      } else {
        setQuestionIndex(questionIndex + 1);
      }
    }
  };

  // Remark: Users cannot go back to previous parts. However they can go back and forth in any given part.
  const backClick = () => {
    if (showQuestions) {
      if (questionIndex === 0) {
        setShowQuestions(false);
        setShowPartInfo(true);
      } else {
        setQuestionIndex(questionIndex - 1);
      }
    }
  };

  function saveToLocal() {
    localStorage.setItem(qID, incomingAnswer);
  }

  const [lastPartCount, setLastPartCount] = useState();
  const [lastQuestionCount, setLastQuestionCount] = useState();

  useEffect(async () => {
    const partNumber = parts.length;
    const lastPartId = parts[partNumber - 1][0];
    const lastPartQuestionArray = [];
    for (let index = 0; index < questions.length; index++) {
      if (questions[index][1] === lastPartId) {
        lastPartQuestionArray.push(questions[index]);
      }
    }
    const lastPartQuestionCount = lastPartQuestionArray.length;
    setLastPartCount(partNumber);
    setLastQuestionCount(lastPartQuestionCount);
  }, [questions]);

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(async () => {
    if (
      partIndex === lastPartCount - 1 &&
      questionIndex === lastQuestionCount - 1
    ) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
  }, [partIndex, questionIndex, showQuestions]);

  const [completed, setCompleted] = useState(false);

  const saveToDb = async () => {
    const arr = [];
    for (let index = 0; index < questions.length; index++) {
      const element = [];
      const qid = questions[index][0];
      const ans = localStorage.getItem(qid);
      element.push(qid);
      element.push(ans);
      arr.push(element);
    }
    var jsonData = {
      data: [
        {
          AssessmentSessionId: currentAssessmentSession,
          AnswerList: arr,
        },
      ],
    };
    const a = await uploadUserAnswersAction(jsonData);
    localStorage.clear();
    setCompleted(true);
  };

  return (
    <div className="testPageLayout">
      {firstPage && <h1>You are about to take the test</h1>}
      {completed && <h1>Completed the test</h1>}
      {!firstPage &&
        parts.map((e, i) => (
          <>
            {showPartInfo && partIndex === i && (
              <PartInformation partInfo={e} />
            )}

            {currentQuestionArray.map(
              (element, index) =>
                showQuestions &&
                partIndex === i &&
                questionIndex === index && (
                  <QuestionBody
                    question={element}
                    passedAnswer={setIncomingAnswer}
                    qID={setQid}
                  />
                )
            )}
          </>
        ))}
      {!completed && (
        <div>
          <button
            onClick={() => {
              backClick();
            }}
          >
            Back
          </button>
          {!isSubmitEnabled ? (
            showQuestions && incomingAnswer === "" ? (
              <button
                disabled
                onClick={() => {
                  nextClick();
                  saveToLocal();
                }}
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => {
                  nextClick();
                  saveToLocal();
                }}
              >
                Next
              </button>
            )
          ) : incomingAnswer === "" ? (
            <button
              disabled
              onClick={() => {
                // nextClick();
                saveToLocal();
                saveToDb();
              }}
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => {
                // nextClick();
                saveToLocal();
                saveToDb();
              }}
            >
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TakeTest;
