import Checkbox from "../../Test/Components/Checkbox";
import TextAnswer from "../../Test/Components/TextAnswer";

const Contact = () => {
  return (
    <div>
      <h1>Contact</h1>
      <Checkbox content="Option 1" clickable={true}/>
      <TextAnswer content="HEYYO" />
    </div>
  );
};

export default Contact;
