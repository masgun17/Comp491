import "../Styles/QuestionBody.css";
import Checkbox from "../Components/Checkbox";
import TextAnswer from "../Components/TextAnswer";
import { useEffect, useState,useContext } from "react";
import { FontSizeContext } from "../../Helper/Context";

const QuestionBody = ({ question, passedAnswer, qID, ...props }) => {
  // TODO: Styling
  // TODO: Depending on the question type, either show options with radio buttons or bring an input area.
  const [options, setOptions] = useState([]);
  const [opt, setOpt] = useState(options);
  const [optChange, setOptChange] = useState(false);
  const [answer, setAnswer] = useState("");
  const [multiChange, setMultiChange] = useState(false);
  const { fontSize, setFontSize } = useContext(FontSizeContext);

  useEffect(async () => {
    // console.log("in first effect");
    setOptions(JSON.parse(question[5]));
    qID(question[0]);
  }, []);

  function handleSavedMultiOptions(){
    if (question[4] !== "free-text" && localStorage.getItem(question[0])) {
      // console.log("inside if");
      // console.log(options, "options");
      const temp = opt;
      temp.fill(false);
      options.forEach((element, index) => {
        if (element === localStorage.getItem(question[0])) {
          console.log(index, "found index");
          temp[index] = true;
        }
      });
      setOpt(temp);
      setOptChange(!optChange);

    }
  }

  useEffect(async () => {
    // console.log(answer, "answer");
    passedAnswer(answer);
  }, [answer]);

  function changeSelection(index) {
    const temp = opt;
    const selectedTemp = temp[index];
    temp.fill(false);
    temp[index] = !selectedTemp;
    setOpt(temp);
  }
  function handleMultipleChoiceAnswer() {
    var count = 0;
    opt.forEach((element, index) => {
      if (element) {
        count++;
        setAnswer(options[index]);
      }
    });
    if (count === 0) {
      setAnswer("");
    }
  }

  useEffect(async () => {
    // console.log("inside optChange");
    handleMultipleChoiceAnswer();
  }, [optChange]);

  useEffect(async () => {
    // console.log("inside multiChange");
    handleSavedMultiOptions();
  }, [multiChange]);

  useEffect(async () => {
    setOpt(Array.apply(null, Array(options.length).fill(false)));
  }, [options]);
  
  return (
    <div className="questionContainer" style={{"font-size":fontSize}}>
      <div className="shownQuestionDescription" style={{"font-size":fontSize}}>{question[2]}<hr></hr></div>
      {question[4] === "free-text" ? (
        <TextAnswer answer={setAnswer} questionID={question[0]} />
      ) : (
        options.map((e, i) => (
          <Checkbox
            id={i}
            content={e}
            filled={opt[i]}
            select={() => {
              changeSelection(i);
              setOptChange(!optChange);
            }}
            load={() => {setMultiChange(!multiChange)}}
          />
        ))
      )}
    </div>
  );
};

export default QuestionBody;
