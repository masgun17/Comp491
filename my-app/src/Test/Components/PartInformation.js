const PartInformation = ({ partInfo, ...props }) => {
  // TODO: Styling
  return (
    <div style={{"font-size":"40px", "text-align":"center"}}>
     <b> {partInfo[1]}</b>  <br />
     <hr></hr>
      {/* Part Id: {partInfo[0]} <br />
      Part Score Limit: {partInfo[2]} <br /> */}
      {partInfo[2]} <br />
    </div>
  );
};

export default PartInformation;
