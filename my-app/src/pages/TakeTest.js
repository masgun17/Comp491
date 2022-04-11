import { useEffect, useState } from "react";
import { getAllPartsAction, getAllQuestionsAction } from "../tool/actions";
import PartInformation from "./PartInformation";
import QuestionBody from "./QuestionBody";

const TakeTest = () => {
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
    }, 300);
  }, []);

  const [firstPage, setFirstPage] = useState(true);
  const [showPartInfo, setShowPartInfo] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [partIndex, setPartIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentPartQuestionCount, setCurrentPartQuestionCount] = useState(0);
  const [currentQuestionArray, setCurrentQuestionArray] = useState([]);

  // TODO: Styling

  // TODO: Add a useState to store user selection and pass it to QuestionBody. Set it to null at each question change
  // and ensure that it is filled on Next button click. Then store this in local storage.

  // TODO: Change Next button to Submit button on last question.

  // Remark: Now we are fetching all questions from db upon entering the test and filter them part by part on frontend.
  // In case we encounter performance issues in the future, we might create new API calls to fetch questions part by part.

  // Discuss: We can either send answers to db when test is finished, or we can send them after each part. In both cases,
  // we will fetch the answers from local storage and then call corresponding API calls.

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

  return (
    <div className="testPageLayout">
      <div>
        {firstPage ? <h1>You are about to take the test</h1> : null}
        {!firstPage
          ? parts.map((e, i) => (
              <div>
                {showPartInfo ? (
                  partIndex === i ? (
                    <PartInformation partInfo={e} />
                  ) : null
                ) : null}

                {currentQuestionArray.map((element, index) =>
                  showQuestions &&
                  partIndex === i &&
                  questionIndex === index ? (
                    <QuestionBody question={element} />
                  ) : null
                )}
              </div>
            ))
          : null}
      </div>
      <div>
        <button
          onClick={() => {
            backClick();
          }}
        >
          Back
        </button>
        <button
          onClick={() => {
            nextClick();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TakeTest;
