import { useEffect, useState } from "react";
import { getSuggestionsByAssessmentIdAction, getSuggestionsContentAction } from "../../tool/actions";
import { Modal } from "react-bootstrap";

const Suggestions = ({ assessmentId, modalShow, ...props }) => {
  const [suggestions, SetSuggestions] = useState([]);

  const getSuggestions = async () => {
    if (assessmentId !== null) {
      var jsonData = {
        data: [
          {
            assessmentId: assessmentId,
          },
        ],
      };
      let suggestionsByAssessmentId = await getSuggestionsByAssessmentIdAction(jsonData);
      console.log(suggestionsByAssessmentId);
      SetSuggestions(suggestionsByAssessmentId);
    }
  };

  useEffect(async () => {
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
          Önerileriniz
        </h1>
        <div>
          <ul>
            {suggestions && suggestions.length !== 0 &&
              suggestions.map(suggestion => <li> {suggestion}</li>)}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default Suggestions;
