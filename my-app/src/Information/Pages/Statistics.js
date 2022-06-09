import { useEffect, useState } from "react";
import {
  getAllQuestionsAction,
  getAnswerPercentageAction,
  getTotalPeopleCountAction,
} from "../../tool/actions";
import "../Styles/Statistics.css";

const Statistics = () => {
  const [questions, setQuestions] = useState([]); // Array that holds question informations
  const [qIDandAnswers, setqIDandAnswers] = useState(); // Array that holds possible options of questions
  const [totalPeopleCount, setTotalPeopleCount] = useState(0);  // Total number of people who solved the test

  const getQuestions = async () => {  // function to fetch all questions and options to questions from db
    let result = await getAllQuestionsAction(); // fetch all questions API call
    setQuestions(result);
    // console.log(result);

    let dict = {};
    result.forEach((element) => { // traverse in all questions
      let ansArr = [];
      if (element[4] === "multi-select") {
        JSON.parse(element[5]).forEach((answer) => {  // for each question (multi-select), traverse in each possible option
          ansArr.push(answer);  // add it to array
        });
      }
      dict[element[0]] = ansArr;  // add it to dictionary -> to fetch it later by question id
    });
    setqIDandAnswers(dict);
  };

  useEffect(async () => { // call getQuestions method on page loading
    setTimeout(() => {
      getQuestions();
    }, 0);
  }, []);

  const [percentageDict, setPercentageDict] = useState(); // dictionary that holds all statistics regarding average of answers, answer ranges and percentage distributions

  const getAnswerPercentages = async () => {
    if (qIDandAnswers) {
      var jsonData = {
        data: [{ dict: qIDandAnswers }],  // send option array and fetch the statistical distributions of options that are selected from test-takers from db
      };
      const a = await getAnswerPercentageAction(jsonData);
      setPercentageDict(a);
    }
  };

  useEffect(async () => { // call getAnswerPercentages when option array changes, which happens at page loading
    setTimeout(() => {
      getAnswerPercentages();
    }, 300);  // 300 ms delay is there to avoid making backend busy
  }, [qIDandAnswers]);

  useEffect(async() => {  // fetch total number of test-takers
    const a =  await getTotalPeopleCountAction();
    setTotalPeopleCount(a);    
}, [percentageDict]);


  function formatBins(string) {  // format the statisticals results hold in percentageDict, to show in screen
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
      <div className="statQuestionWrapper">
          <div className="statQuestionContent"> 
              <b>Testi Cevaplayan Toplam Kişi Sayısı: </b> {totalPeopleCount}
          </div>
      </div>
      {questions.map((e, i) => (
        <div className="statQuestionWrapper">
          <div className="statQuestionContent">{e[2]}
          </div>
          {e[4] === "multi-select" ? (
            <div  style={{ margin: "5px", fontSize: "18px", color:"black" }}>
              <b>Soruyu Cevaplayan Toplam Kişi Sayısı: </b>
              <span>{percentageDict && percentageDict[e[0]][1]}</span>
            </div>
          ) : (
            <div  style={{ fontSize: "18px", color:"black" }}>
            <b>Soruyu Cevaplayan Toplam Kişi Sayısı: </b> 
            <span>{percentageDict && percentageDict[e[0]][3]}</span>
          </div>          )}
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
             {(percentageDict && percentageDict[e[0]][0]!==0) ? (<> 
              <b className="statHeader">Ortalama Cevap: </b>
              <span>
                {percentageDict && percentageDict[e[0]][0]!==0 && percentageDict[e[0]][0].toFixed(2)}
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
                {(percentageDict && percentageDict[e[0]][0]!==0)
                  ? formatBins(percentageDict[e[0]][1])[0].map((e2, i2) => (
                    <div className="contentGrid">
                      <span className="statBin">{`${e2}-${formatBins(percentageDict[e[0]][1])[1][i2]
                        }`}</span>
                      <span className="statVal">
                        {percentageDict && 
                          `%${(formatBins(percentageDict[e[0]][1])[2][i2] / percentageDict[e[0]][2] * 100).toFixed(2)}`}
                      </span>
                    </div>
                  ))
                  : {}}
              </div>
              </>):(<>Bu soru daha cevaplanmamıştır.</>)}
            </pre>
          )}
        </div>
         
      ))}
    </div>
  );
};

export default Statistics;
