import { useEffect, useState } from "react";
import {
  getAllQuestionsAction,
  getAnswerPercentageAction,
} from "../../tool/actions";

const Statistics = () => {
  const [questions, setQuestions] = useState([]);
  const [qIDandAnswers, setqIDandAnswers] = useState();

  const getQuestions = async () => {
    let result = await getAllQuestionsAction();
    setQuestions(result);

    let dict = {};
    result.forEach((element) => {
      let ansArr = [];
      if (element[4] === "multi-select") {
        JSON.parse(element[5]).forEach((answer) => {
          ansArr.push(answer);
        });
      }
      dict[element[0]] = ansArr;
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
    if (qIDandAnswers) {
      var jsonData = {
        data: [{ dict: qIDandAnswers }],
      };
      const a = await getAnswerPercentageAction(jsonData);
      setPercentageDict(a);
    }
  };

  useEffect(async () => {
    setTimeout(() => {
      getAnswerPercentages();
    }, 300);
  }, [qIDandAnswers]);

  function formatBins(string) {
    let result = JSON.parse(string);
    let finalStr = "";

    for (const [key, val] of Object.entries(result)) {
      let dummy1 = key.split("(");
      let dummy2 = dummy1[1].split("]");
      let dummy3 = dummy2[0].split(", ");
      let startBin = dummy3[0];
      let endBin = dummy3[1];
      console.log(startBin, "start");
      console.log(endBin, "end");
      console.log(val, "count");
      let returnStr = `${startBin} - ${endBin} => ${val} \n `;
      finalStr = finalStr.concat(returnStr);
    }
    return finalStr
  }

  return (
    // <h1 style={{ "margin-top": "10%" }}>Statistics</h1>
    <div style={{ "margin-top": "150px" }}>
      {questions.map((e, i) => (
        <>
          <div>{e[2]}</div>
          {e[4] === "multi-select" ? (
            JSON.parse(e[5]).map((answer, index) => (
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;{answer}
                {percentageDict && percentageDict[e[0]][0][answer]}
              </div>
            ))
          ) : (
            <pre>
              {percentageDict && percentageDict[e[0]][0]}
              <br />
              {percentageDict && formatBins(percentageDict[e[0]][1])}
            </pre>
          )}
        </>
      ))}
    </div>
  );
};

export default Statistics;
