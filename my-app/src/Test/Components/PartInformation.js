const PartInformation = ({ partInfo, ...props }) => {
  // TODO: Styling
  return (
    <div>
      Part Name : {partInfo[1]} <br />
      Part Id: {partInfo[0]} <br />
      Part Score Limit: {partInfo[2]} <br />
    </div>
  );
};

export default PartInformation;
