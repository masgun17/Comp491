import "../Styles/QuestionBody.css";
import Checkbox from "../Components/Checkbox";
import TextAnswer from "../Components/TextAnswer";
import { useEffect, useState,useContext } from "react";
import { FontSizeContext } from "../../Helper/Context";

const QuestionBody = ({ question, passedAnswer, qID, ...props }) => {
  const [options, setOptions] = useState([]); // holds options for given question
  const [opt, setOpt] = useState(options); // array of boolean - true for selected option, false for other options
  const [optChange, setOptChange] = useState(false); // boolean value flag to detect changes in selection of options
  const [answer, setAnswer] = useState(""); // selected answer
  const [multiChange, setMultiChange] = useState(false); // boolean value flag for initialization of checkboxes of multiple-choice options
  const { fontSize, setFontSize } = useContext(FontSizeContext);

  useEffect(async () => { // parse options and id from passed question information
    setOptions(JSON.parse(question[5]));  
    qID(question[0]);
  }, []);

  function handleSavedMultiOptions(){ // on load function of question
    if (question[4] !== "free-text" && localStorage.getItem(question[0])) { 
      // console.log("inside if");
      // console.log(options, "options");
      const temp = opt;
      temp.fill(false);
      options.forEach((element, index) => {
        if (element === localStorage.getItem(question[0])) {  // if answered before, fetches it from local storage and set it true
          console.log(index, "found index");
          temp[index] = true;
        }
      });
      setOpt(temp);   //  sets all other options to false
      setOptChange(!optChange); // flag update

    }
  }

  useEffect(async () => {
    passedAnswer(answer);   // when answer is updated, sends it to parent
  }, [answer]);

  function changeSelection(index) { // checkbox on click method - negates the selection on clicked checkbox and sets others to false
    const temp = opt;   
    const selectedTemp = temp[index];
    temp.fill(false);
    temp[index] = !selectedTemp;
    setOpt(temp);
  }

  function handleMultipleChoiceAnswer() { // checkbox on click method - gets the selected option's text 
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
    handleMultipleChoiceAnswer();
  }, [optChange]);

  useEffect(async () => {
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
