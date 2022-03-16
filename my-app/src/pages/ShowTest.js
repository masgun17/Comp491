import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShowTest = () => {
  const navigate = useNavigate();

  // I assumed that question details that we will fetch from db will be in double array format
  let arr = [...Array(5)];
  for( let index = 0 ; index < arr.length; index +=1) {
    const arr2 = [...Array(10)];
    arr[index] = arr2;
  }

  console.log(arr);
  return (
    <div className="showTestPageLayout">
      <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
        <h1>Test Soruları</h1>
      </div>
      
      {arr.map((e,i) => (
        <div className="showTestDiv" >
        <div className="partHeader">
          <h2>Part {i+1}</h2>
        </div>
        {e.map((element, index) => (
          <div className="questionDetails">
          Question {index + 1}
        </div>
        )
        )}
        <button
          className="addQuestionButton"
          // Update onClick function such that it will open a modal content structure
          onClick={() => navigate("/showTest")}
        >
          Add Question
        </button>
      </div>
      ))

      }
      
      

    </div>
  );
};

export default ShowTest;