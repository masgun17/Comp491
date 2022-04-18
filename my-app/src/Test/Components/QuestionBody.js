const QuestionBody = ({ question, ...props }) => {
  // TODO: Styling
  // TODO: Depending on the question type, either show options with radio buttons or bring an input area.

  return (
    <div>
      Question Type: {question[4]} <br />
      Question Text: {question[2]} <br />
      Question Choices: {question[5]} <br />
      Question Id: {question[0]} <br />
      Question Part Id: {question[1]} <br />
      Question Weight: {question[3]}
    </div>
  );
};

export default QuestionBody;
