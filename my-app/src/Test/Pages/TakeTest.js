import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  getAllPartsAction,
  getAllQuestionsAction,
  createAssessmentSessionAction,
  uploadUserAnswersAction,
  evaluateAction,
  getSuggestionsByAssessmentIdAction,
} from "../../tool/actions";
import PartInformation from "../Components/PartInformation";
import QuestionBody from "../Components/QuestionBody";
import "../Styles/TakeTest.css";
import { FontSizeContext } from "../../Helper/Context";

const TakeTest = () => {
  const [id, setId] = useState(null); // user id information to create assessment session at the end of test
  const [currentAssessmentSession, setCurrentAssessmentSession] = useState(0);  // newly created assessment session info
  const [incomingAnswer, setIncomingAnswer] = useState(""); // answer given to current question
  const [qID, setQid] = useState(); // id of current question
  const { fontSize, setFontSize } = useContext(FontSizeContext);
  const navigate = useNavigate(); // used for page navigation
  toast.configure();  // used for age warning popup

  const createAssessmentSession = async () => { // create a new assessment session at the end of test
    var jsonData = {
      data: [
        {
          UserId: id,
        },
      ],
    };
    const a = await createAssessmentSessionAction(jsonData);
    setCurrentAssessmentSession(a);
    return a;
  };

  useEffect(async () => { // fetch user id from local storage
    setId(sessionStorage.getItem("userId"));  
  }, [id]);

  const [parts, setParts] = useState([]); // holds part information

  const getParts = async () => {  // fetch part information
    let result = await getAllPartsAction();
    setParts(
      result.sort((a, b) => {   // sort them to access them in order (Part 01 -> Part 02 -> and so on)
        return a[1].localeCompare(b[1]);
      })
    );
  };

  useEffect(async () => { // fetch parts on page loading
    await getParts();
  }, []);

  const [questions, setQuestions] = useState([]); // holds all question information

  const getQuestions = async () => {  // fetch question information
    let result = await getAllQuestionsAction();
    setQuestions(result);
  };

  useEffect(async () => { // fetch all question information with small delay
    setTimeout(() => {
      getQuestions();
    }, 100);
  }, []);


  // In our system, when a user starts a session, an information page welcomes them. After that page,
  // they start the test. For each part, an information page is present at the start, followed by questions of that part.
  // Users allowed to go back and forth in each part, but they cannot go back to previous parts.

  const [firstPage, setFirstPage] = useState(true); // initial welcoming page flag
  const [showPartInfo, setShowPartInfo] = useState(false);  // part information page flag
  const [showQuestions, setShowQuestions] = useState(false);  // question flag

  const [partIndex, setPartIndex] = useState(0);  // index to detect which part is currently active
  const [questionIndex, setQuestionIndex] = useState(0);  // index to detect which question is currently active
  const [currentPartQuestionCount, setCurrentPartQuestionCount] = useState(0);  // question count of active part
  const [currentQuestionArray, setCurrentQuestionArray] = useState([]); // question array, consisting of the questions of active part

  const [suggestions, SetSuggestions] = useState([]); // array to hold suggestions, which will be returned upon completion of test

  // Remark: Now we are fetching all questions from db upon entering the test and filter them part by part on frontend.
  // In case we encounter performance issues in the future, we might create new API calls to fetch questions part by part.

  const nextClick = () => { // next button click - for better understanding refer to lines 73/75
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
  const backClick = () => { // back button behavior
    if (showQuestions) {
      if (questionIndex === 0) {
        setShowQuestions(false);
        setShowPartInfo(true);
      } else {
        setQuestionIndex(questionIndex - 1);
      }
    }
  };

  function saveToLocal() {  // method that saves individual answers to local storage
    localStorage.setItem(qID, incomingAnswer);
  }

  const [lastPartCount, setLastPartCount] = useState(); // last part and question informations to turn 'Next' button into 'Submit' button
  const [lastQuestionCount, setLastQuestionCount] = useState();

  useEffect(async () => { // method to fill lastPartCount and lastQuestionCount
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

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);  // last question check

  useEffect(async () => {
    if (
      partIndex === lastPartCount - 1 &&
      questionIndex === lastQuestionCount - 1 &&
      showQuestions
    ) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
  }, [partIndex, questionIndex, showQuestions]);

  const [completed, setCompleted] = useState(false);  // flag - whether test is completed or not
  const [suggestionStart, setSuggestionStart] = useState(false);  // flags for suggestions screen
  const [suggestionIsDone, setSuggestionIsDone] = useState(false);


  const [answerArray, setAnswerArray] = useState([]); // answer array to send user answers to backend

  const saveToDb = async () => {  // API call to send user answers
    let sessionId = currentAssessmentSession;
    sessionId = await createAssessmentSession();  // first create a session
    
    setTimeout(() => {
      const arr = [];
      for (let index = 0; index < questions.length; index++) {
        const element = [];
        const qid = questions[index][0];
        const ans = localStorage.getItem(qid);
        element.push(qid);
        element.push(ans);
        arr.push(element);
      }
      setAnswerArray(arr);  // populate answer array from local storage

      var jsonData = {
        data: [
          {
            AssessmentSessionId: sessionId,
            AnswerList: arr,
          },
        ],
      };
      uploadUserAnswersAction(jsonData);  // upload answers
      localStorage.clear(); // clear local storage
      setCompleted(true); // set flag
    }, 300);
  };

  useEffect(async () => { // age check (only users older than 65 years old will be able to take the test)
    const response = localStorage.getItem(1);
    if (response) {
      if (parseInt(response) < 65) {
        toast.warning(
          "Testi alabilmeniz için yaşınız 65 veya üzeri olmalıdır!",
          { position: toast.POSITION.TOP_CENTER, autoClose: 5000 }
        );
        navigate("/testInformation");
        localStorage.clear();
      }
    }
  });

  useEffect(async () => { // evaluate user answers
    if (completed) {
      setTimeout(() => {
        var jsonData = {
          data: [
            {
              AssessmentSessionId: currentAssessmentSession,
              AnswerList: answerArray,
            },
          ],
        };
        console.log(answerArray)
        const a = evaluateAction(jsonData).then(
          (onResolved) => {
            setSuggestionStart(true); // show suggestions flag
          });
      }, 300);
    }
  }, [completed]);

  useEffect(async () => { // fetch suggestions based on the evaluation above

    if (currentAssessmentSession !== null && suggestionStart) {
      var jsonData2 = {
        data: [
          {
            assessmentId: currentAssessmentSession,
          },
        ],
      };
      let suggestionsByAssessmentId = await getSuggestionsByAssessmentIdAction(jsonData2);
      SetSuggestions(suggestionsByAssessmentId);  // show suggestions
      setSuggestionIsDone(true);
    }

  }, [suggestionStart]);

  return (
    <div className="testPageLayout">
      {firstPage && <h1 style={{ "font-size": fontSize * 2 }}>Teste başlamak üzeresiniz. Lütfen ileri tuşuna basın!</h1>}
      {completed && suggestionIsDone &&
        suggestions && suggestions.length !== 0 &&
        <div  style={{
          margin: "0% 10% 10% 10%",
          "justify-content": "center",
          "align-items": "center",
        }}>
          <h1 style={{ "font-size": fontSize * 2,"align-content": "center", "text-align": "center"  }}>Sizin için Önerilerimiz</h1>
        <ul style={{ "font-size": fontSize * 1.5 , "text-align": "justify"}}>
          {suggestions && suggestions.length !== 0 &&
            suggestions.map(suggestion => <li> {suggestion}<hr></hr></li>)}
        </ul>
      </div>}

      {!firstPage && !completed &&
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
          {showPartInfo ? (
            <button class="btn btn-secondary btn-lg"
              disabled
              onClick={() => {
                backClick();
              }}
            >
              Geri
            </button>
          ) : (
            <button class="btn btn-secondary btn-lg"
              onClick={() => {
                backClick();
              }}
            >
              Geri
            </button>
          )}
          {!isSubmitEnabled ? (
            showQuestions && incomingAnswer === "" ? (
              <button class="btn btn-secondary btn-lg" style={{ float: 'right' }}
                disabled
                onClick={() => {
                  nextClick();
                  saveToLocal();
                }}
              >
                İleri
              </button>
            ) : (
              <button class="btn btn-secondary btn-lg" style={{ float: 'right' }}
                onClick={() => {
                  nextClick();
                  saveToLocal();
                }}
              >
                İleri
              </button>
            )
          ) : incomingAnswer === "" ? (
            <button class="btn btn-success btn-lg" style={{ float: 'center' }}
              disabled
              onClick={() => {
                // nextClick();
                saveToLocal();
                saveToDb();
              }}
            >
              Testi Bitir
            </button>
          ) : (
            <button class="btn btn-success btn-lg" style={{ float: 'center' }}
              onClick={() => {
                // nextClick();
                saveToLocal();
                saveToDb();
              }}
            >
              Testi Bitir
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TakeTest;
