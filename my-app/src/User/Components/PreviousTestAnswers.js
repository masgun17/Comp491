import { useEffect, useState } from "react";
import {
  getAllQuestionsAction,
  getAllAnswersAction,
} from "../../tool/actions";
import PreviousTestQuestionBody from "../Components/PreviousTestQuestionBody";
import { Modal } from "react-bootstrap";

const PreviousTestAnswers = ({ assessmentId, modalShow, ...props }) => {
  const [currentQuestionArray, setCurrentQuestionArray] = useState([]); //Questions stored in the database
  const [answersQuestions, setAnswersQuestions] = useState([]); //Answers given to the questions for the assessment session 

  const getQuestions = async () => {
    let result = await getAllQuestionsAction(); //API call for getting all the questions from the database.
    var jsonData = { //request's data
      data: [
        {
          assessmentId: assessmentId, //Assessment Id of the row clicked by the user.
        },
      ],
    };
    let answers = await getAllAnswersAction(jsonData); //Getting answers of the assessment session of the user.
    setAnswersQuestions(answers[0]); //Filling answers' array 
    setCurrentQuestionArray(result); //Filling questions' array
  };

  useEffect(async () => {
    setTimeout(() => {
      getQuestions(); //Function for getting questions
    }, 100);
  }, [modalShow]); //Calling this useEffect when modal is opened.

  return (
    <Modal {...props} size="l" centered>
      <div
        // className="Layout"
        style={{
          margin: "0% 20% 10% 20%",
          "justify-content": "center",
          "align-items": "center",
        }}
      >
        <h1 style={{ "align-content": "center", "text-align": "center" }}>
          Cevaplarınız{" "}
        </h1>
        {answersQuestions &&
          answersQuestions.length !== 0 &&
          answersQuestions.qID.map((element, index) =>
            currentQuestionArray.map(
              (element2, index2) =>
                element === element2[0] && (
                  <PreviousTestQuestionBody
                    questionNum={index+1}
                    assessmentId={assessmentId}
                    question={element2}
                    passedAnswer={answersQuestions.userAnswers[index]}
                  />
                )
            )
          )}
      </div>
    </Modal>
  );
};

export default PreviousTestAnswers;
