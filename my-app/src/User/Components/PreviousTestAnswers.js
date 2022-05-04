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
import "../../Test/Styles/TakeTest.css";
import { Modal } from "react-bootstrap";

const PreviousTestAnswers = ({ assessmentId, modalShow, ...props }) => {
    const [id, setId] = useState(null);
    const [currentAssessmentSession, setCurrentAssessmentSession] = useState(0);
    const [incomingAnswer, setIncomingAnswer] = useState("");
    //const [qID, setQid] = useState();
    const [currentQuestionArray, setCurrentQuestionArray] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answersQuestions, setAnswersQuestions] = useState([]);

    const getQuestions = async () => {
        let result = await getAllQuestionsAction();
        var jsonData = {
            "data": [{
              "assessmentId": assessmentId
            }]
          };
        let answers = await getAllAnswersAction(jsonData);
        console.log(answers)
        console.log(result)
        setAnswersQuestions(answers[0])
        console.log(answersQuestions.qID)
        //setQuestions(result);
        setCurrentQuestionArray(result);
    };

    useEffect(async () => {
        setTimeout(() => {
            getQuestions();
        }, 100);
    }, [modalShow]);



    return (
        <Modal {...props} size="l" centered>

            <div className="Layout" style={{"margin":"0% 20% 10% 20%", "justify-content": "center","align-items": "center"}}>
                <h1 style={{"align-content":"center", "text-align":"center"}}>Cevaplarınız </h1>
                {console.log(answersQuestions?.qID)}
                {answersQuestions && answersQuestions.length!== 0 && answersQuestions.qID.map(
                    (element, index) =>
                    (
                        currentQuestionArray.map(
                        (element2, index2) =>
                        element === element2[0] &&
                         <PreviousTestQuestionBody
                            assessmentId={assessmentId}
                            question={element2}
                            passedAnswer={answersQuestions.userAnswers[index]}
                            qID={element2}
                        />
                    )
                        // <div> 
                        // {element}
                        //                         </div>

                        // <PreviousTestQuestionBody
                        //     assessmentId={assessmentId}
                        //     question={element}
                        //     passedAnswer={setIncomingAnswer}
                        //     qID={setQid}
                        // />
                    )
                )}
            </div>
        </Modal>

    );
};

export default PreviousTestAnswers;
