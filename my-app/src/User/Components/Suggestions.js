import { useEffect, useState } from "react";
import { getSuggestionsByAssessmentIdAction, getSuggestionsContentAction } from "../../tool/actions";
import { Modal } from "react-bootstrap";

const Suggestions = ({ assessmentId, modalShow, ...props }) => {
  const [suggestions, SetSuggestions] = useState([]); //Keeping suggestions coming from the backend

  const getSuggestions = async () => { //Getting suggestions given to that assessment 
    if (assessmentId !== null) {
      var jsonData = { //request's data
        data: [
          {
            assessmentId: assessmentId,
          },
        ],
      };
      let suggestionsByAssessmentId = await getSuggestionsByAssessmentIdAction(jsonData); //API call for getting suggestions given to that assessment
      SetSuggestions(suggestionsByAssessmentId); //Setting suggestions to a variable
    }
  };

  useEffect(async () => { //useEffect which will start working when the modal is open.
    setTimeout(() => {
      getSuggestions();
    }, 100);
  }, [modalShow]);

  return (
    <Modal {...props} size="l" centered>
      <div
        // className="Layout"
        style={{
          margin: "0% 20% 10% 20%",
          "justify-content": "center",
          "align-items": "center",
        }}
      >
        
        <h1 style={{ "align-content": "center", "text-align": "center" }}>
          Sizin için Önerilerimiz
        </h1>
        <div>
          <ul style={{ "text-align": "justify"}}>
            {suggestions && suggestions.length !== 0 &&
              suggestions.map(suggestion => <li> {suggestion}<hr></hr></li>)}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default Suggestions;
