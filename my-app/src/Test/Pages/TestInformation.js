import { useNavigate } from "react-router-dom";
import "../Styles/TestInformation.css";
import React, { useContext } from "react";
import { FontSizeContext } from "../../Helper/Context";

const TestInformationPage = () => {
  const navigate = useNavigate(); // used for page navigation
  let userTypeId = sessionStorage.getItem('userTypeId')
  const { fontSize, setFontSize } = useContext(FontSizeContext)

  return (
    <div className="testInformationPageLayout">
      <div className="testInfoDiv2" style={{ "grid-row-start": "2", "font-size": fontSize, "line-height": "1.8" }}>
        <h1 style={{ "font-size": fontSize*1.5 }}>Test Hakkında</h1>
        Bu testi tamamlamak yaklaşık 10-15 dakika sürer.
        Sağlığınız ve yaşam tarzınızla ilgili basit soruları yanıtlayarak demans açısından risk oluşturan yaşam  alanlarınızı belirleyebilirsiniz.
        Bu testte kişisel bir risk değerlendirmesi yapılarak bazı tavsiyeler ekranda görünecektir. Riskinizi azaltmak için yapabilecekleriniz hakkında bilgi edinerek, beyin sağlığınızı korumada kendiniz için bir adım atabilirsiniz.
        Bu teste verilen cevaplar ve sonuçlar gizli tutulacaktır.
        Size verilen tavsiye ve risk faktörlerinin doğru şekilde değerlendirilebilmesi için testi cevaplarken verdiğiniz yanıtların doğru olması oldukça önemlidir.
        Katılımınız için teşekkür ederiz.

      </div>
      <div className="testInformationPageButtonLayout" style={{ "grid-row-start": "3" }}>
        {userTypeId === '3' ? (
          <button className="showTestButton" onClick={() => navigate("/showTest")}> Testi Düzenle </button>
        ) : (
          null
        )}
        <button className="showTestButton" onClick={() => navigate("/takeTest")}> Teste Başla </button>
      </div>
    </div>
  );
};

export default TestInformationPage;