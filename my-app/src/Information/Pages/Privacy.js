import React, { useState, useContext } from "react";
import "../Styles/InfoPage.css";
import { FontSizeContext } from "../../Helper/Context";

const Privacy = () => {
  const { fontSize, setFontSize } = useContext(FontSizeContext); //To share the font-size of all of the text between the components and pages

  return (
    <div className="testInformationPageLayout">
      <div
        className="testInfoDiv2"
        style={{
          "grid-row-start": "2",
          "font-size": fontSize,
          "line-height": "1.8",
        }}
      >
        <h1 style={{ "font-size": fontSize * 1.5 }}>Gizlilik</h1>
        Türk toplumunda demans ile ilişkili yaşam tarzı risklerinin belirlenmesi
        kapsamında yapılan bu çalışmada sizden kayıt esnasında istenen e-posta
        adresiniz veya bilgilerin asla araştırma amacı dışında
        kullanılmayacağını belirtmek isteriz. <br></br>
        Bu web-sitesinde sizin yaşam şeklinize yönelik demans riski
        oluşturabilecek bazı sorular sorulmaktadır. Bu sorularla ilgili verilen
        cevaplar yalnızca araştırma amacıyla kullanılacak olup gizliliği ve
        kişilerin mahremiyeti etik kurallar çerçevesinde sağlanacaktır.{" "}
        <br></br>
        Kişisel yanıtlarınızdan sonra verilen tavsiyeler profesyonel ve tıbbi
        tavsiyenin yerine geçmediğini kabul ederek çalışmaya katılmaya onay
        verdiğinizi kabul etmeniz gerekmektedir.
      </div>
    </div>
  );
};

export default Privacy;
