const PartInformation = ({ partInfo, ...props }) => {

  return (
    <div style={{"font-size":"40px", "text-align":"center"}}>
     <b> {partInfo[1]}</b>  <br />
     <hr></hr>
      {partInfo[2]} <br />
    </div>
  );
};

export default PartInformation;
