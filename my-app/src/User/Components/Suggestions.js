import { useEffect, useState } from "react";
import {getSuggestionsByAssessmentIdAction,getSuggestionsContentAction} from "../../tool/actions";
import { Modal } from "react-bootstrap";

const Suggestions = ({ assessmentId, modalShow, ...props }) => {
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
    let suggestionsContent = []
    //console.log(suggestionsByAssessmentId)
    for(let sid in suggestionsByAssessmentId){
      var jsonData2 = {
        data: [
          {
            suggestionId: sid,
          },
        ],
      };
      //const suggestionContent = await getSuggestionsContentAction(jsonData2);
      //console.log(suggestionContent)
    }
    //SetSuggestions(suggestionsByAssessmentId[0]);
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
          Önerileriniz {assessmentId}
        </h1>
      </div>
    </Modal>
  );
};

export default Suggestions;
