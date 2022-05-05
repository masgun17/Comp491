const PartInformation = ({ partInfo, ...props }) => {
  // TODO: Styling
  return (
    <div style={{"font-size":"40px", "text-align":"center"}}>
     <b> Bölüm Adı :</b> {partInfo[1]} <br />
      {/* Part Id: {partInfo[0]} <br />
      Part Score Limit: {partInfo[2]} <br /> */}
    </div>
  );
};

export default PartInformation;
