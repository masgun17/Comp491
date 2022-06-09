import Checkbox from "./PreviousCheckbox";
import TextAnswer from "./PreviousTextAnswer";
import { useEffect, useState } from "react";
import "../Styles/PreviousTest.css";

const PreviousTestQuestionBody = ({ questionNum, question, passedAnswer, assessmentId, ...props }) => {
  const [options, setOptions] = useState([]); //Options of the question
  const [opt, setOpt] = useState(options); //Selected option for the question

  useEffect(async () => {
    const localOptions = JSON.parse(question[5])
    setOptions(localOptions);

    let temp = localOptions.slice();
    localOptions.forEach((element, index) => {
      if (element === passedAnswer) { //If passedAnswer and the element is equal, select that index as selected
        temp[index] = true;
      } else {
        temp[index] = false; //If passedAnswer and the element is not equal, do not select that index as selected
      }
    });
    setOpt(temp);
  }, []);


  return (
    <div className="questionContainer">
      <div className="shownQuestionDescription">{questionNum + " - " + question[2] }<hr></hr></div>
      {question[4] === "free-text" ? (
        <TextAnswer answer={passedAnswer} />
      ) : (
        options.map((e, i) => (
          <Checkbox
            content={e}
            filled={opt[i]}
          />
        ))
      )}
    </div>
  );
};

export default PreviousTestQuestionBody;
