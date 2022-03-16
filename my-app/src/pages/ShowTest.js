import { useNavigate } from "react-router-dom";

const ShowTest = () => {
  const navigate = useNavigate();

  // I assumed that question details that we will fetch from db will be in double array format
  // Probably we will have to switch to useState structure when we fetch from db
  let partArray = [...Array(5)];
  for (let index = 0; index < partArray.length; index += 1) {
    const questionsPerPart = [...Array(10)];
    partArray[index] = questionsPerPart;
  }
  return (
    <div className="showTestPageLayout">
      <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
        <h1>Test Soruları</h1>
      </div>
      {partArray.map((e, i) => (
        <div className="showTestDiv" >
          <div className="partHeader">
            <h2>Part {i + 1}</h2>
          </div>
          {e.map((element, index) => (
            <div className="questionDetails">
              <div>Question {index + 1}</div>
              <div>Answers {index + 1}</div>
              <div className="questionButtonLayout">
                <button className="editButton" />
                <button className="deleteButton" />
              </div>

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
      ))}
    </div>
  );
};

export default ShowTest;