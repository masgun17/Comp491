import { useEffect, useState } from "react";
import { getAllQuestionsAction, getAnswerPercentageAction } from "../../tool/actions";

const Statistics = () => {
  const [questions, setQuestions] = useState([]);
  const [qIDandAnswers, setqIDandAnswers] = useState();

  const getQuestions = async () => {
    let result = await getAllQuestionsAction();
    setQuestions(result);

    let dict = {};
    result.forEach(element => {
      let ansArr = [];
      if(element[4] === "multi-select") {
        JSON.parse(element[5]).forEach(answer => {
          ansArr.push(answer)
        });
      }
      // dict.push({element[0]: ansArr})
      dict[element[0]] = ansArr
    });
    setqIDandAnswers(dict);
  };

  useEffect(async () => {
    setTimeout(() => {
      getQuestions();
    }, 0);
  }, []);

  const [percentageDict, setPercentageDict] = useState();

  const getAnswerPercentages = async () => {  
    if(qIDandAnswers) {
      var jsonData = {
        data: [
          {dict: qIDandAnswers}
        ]
      }
      const a = await getAnswerPercentageAction(jsonData);
      // console.log(a);
      setPercentageDict(a);
    }
  }

  useEffect(async () => {
    setTimeout(() => {
      getAnswerPercentages();
    }, 300);
  }, [qIDandAnswers]);

  return (
    // <h1 style={{ "margin-top": "10%" }}>Statistics</h1>
    <div style={{ "margin-top": "150px" }}>
      {questions.map((e,i) => (
        <>
          <div>
            {e[2]}
          </div>
          {e[4] === "multi-select" &&   JSON.parse(e[5]).map((answer,index) => (
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;{answer}
              {/* {percentageDict && console.log(percentageDict[e[0]][0][answer])} */}
              {percentageDict && 
              percentageDict[e[0]][0][answer]}
            </div>
          ))}
        </>
      ))}
    </div>
  );
};

export default Statistics;
