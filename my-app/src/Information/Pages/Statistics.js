import { useEffect, useState } from "react";
import {
  getAllQuestionsAction,
  getAnswerPercentageAction,
} from "../../tool/actions";
import "../Styles/Statistics.css";

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
    // let finalStr = "";
    let startReturnArr = [];
    let endReturnArr = [];
    let valReturnArr = [];
    let finalArr = [];

    for (const [key, val] of Object.entries(result)) {
      let dummy1 = key.split("(");
      let dummy2 = dummy1[1].split("]");
      let dummy3 = dummy2[0].split(", ");
      let startBin = dummy3[0];
      let endBin = dummy3[1];
      startReturnArr.push(parseFloat(startBin).toFixed(1));
      endReturnArr.push(parseFloat(endBin).toFixed(1));
      valReturnArr.push(val);
    }
    finalArr.push(startReturnArr);
    finalArr.push(endReturnArr);
    finalArr.push(valReturnArr);
    return finalArr;
  }

  return (
    <div style={{ "margin-top": "150px" }}>
      {questions.map((e, i) => (
        <div className="statQuestionWrapper">
          <div className="statQuestionContent">{e[2]}</div>
          {e[4] === "multi-select" ? (
            JSON.parse(e[5]).map((answer, index) => (
              <div style={{ margin: "5px", fontSize: "18px" }}>
                <b>{`Seçenek ${index + 1}: `}</b>
                <span>{`${answer}`}</span>
                <br />
                <b>Seçilme Yüzdesi: </b>
                {percentageDict &&
                  `%${(percentageDict[e[0]][0][answer] * 100).toFixed(2)} `}
                <br />
                <br />
              </div>
            ))
          ) : (
            <pre className="statAnswerContent">
              <b className="statHeader">Ortalama Cevap: </b>
              <span>
                {percentageDict && percentageDict[e[0]][0].toFixed(2)}
              </span>
              <br />
              {/* <b>{`Cevap Aralığı            Seçilme Yüzdesi`}</b> */}
              <div className="headerGrid">
                <div className="statHeader1">
                  Cevap Aralığı
                </div>
                <div className="statHeader2">
                  Seçilme Yüzdesi
                </div>
              </div>
              <div>
                {percentageDict
                  ? formatBins(percentageDict[e[0]][1])[0].map((e2, i2) => (
                      <div className="contentGrid">
                        <span className="statBin">{`${e2}-${
                          formatBins(percentageDict[e[0]][1])[1][i2]
                        }`}</span>
                        <span className="statVal">
                          {percentageDict &&
                            (formatBins(percentageDict[e[0]][1])[2][i2]/percentageDict[e[0]][2]*100 ).toFixed(2)}
                        </span>
                      </div>
                    ))
                  : console.log("jhgj")}
              </div>
            </pre>
          )}
        </div>
      ))}
    </div>
  );
};

export default Statistics;
