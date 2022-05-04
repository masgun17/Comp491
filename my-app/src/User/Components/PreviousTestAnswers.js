import { useEffect, useState } from "react";
import {
  getAllPartsAction,
  getAllQuestionsAction,
  createAssessmentSessionAction,
  uploadUserAnswersAction,
  getAllAnswersAction,
} from "../../tool/actions";
import PartInformation from "../../Test/Components/PartInformation";
import PreviousTestQuestionBody from "../Components/PreviousTestQuestionBody";
import { Modal } from "react-bootstrap";

const PreviousTestAnswers = ({ assessmentId, modalShow, ...props }) => {
  const [currentQuestionArray, setCurrentQuestionArray] = useState([]);
  const [answersQuestions, setAnswersQuestions] = useState([]);

  const getQuestions = async () => {
    let result = await getAllQuestionsAction();
    var jsonData = {
      data: [
        {
          assessmentId: assessmentId,
        },
      ],
    };
    let answers = await getAllAnswersAction(jsonData);
    setAnswersQuestions(answers[0]);
    setCurrentQuestionArray(result);
  };

  useEffect(async () => {
    setTimeout(() => {
      getQuestions();
    }, 100);
  }, [modalShow]);

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
