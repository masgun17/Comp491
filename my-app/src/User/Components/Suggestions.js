import { useEffect, useState } from "react";
import {getSuggestionsByAssessmentIdAction} from "../../tool/actions";
import { Modal } from "react-bootstrap";

const Suggestions = ({ assessmentId, modalShowSuggestions, ...props }) => {
  const [suggestions, SetSuggestions] = useState([]);

  const getSuggestions = async () => {
    var jsonData = {
      data: [
        {
          assessmentId: assessmentId,
        },
      ],
    };
    let suggestionsByAssessmentId = await getSuggestionsByAssessmentIdAction(jsonData);
    //SetSuggestions(suggestionsByAssessmentId[0]);
  };

  useEffect(async () => {
    setTimeout(() => {
      getSuggestions();
    }, 100);
  }, [modalShowSuggestions]);

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
          Önerileriniz{" "}
        </h1>
      </div>
    </Modal>
  );
};

export default Suggestions;
