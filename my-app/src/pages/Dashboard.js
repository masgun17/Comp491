const Dashboard = () => {
  return (
    // <h1>Dashboard</h1>;
      <div className="dashboardLayout">
        <div className="dashboardDiv1" style={{"grid-row-start": "1"}}>
            <h1>Anasayfa</h1>
        </div>
        <div className="dashboardDiv2" style={{"grid-row-start": "2"}}>
            Test Hakkında
        </div>
        <div className="dashboardDiv3" style={{"grid-row-start": "3"}}>
            Neden böyle bir test yapma ihtiyacı duyduk?
        </div>
      </div>
  );
};

export default Dashboard;
