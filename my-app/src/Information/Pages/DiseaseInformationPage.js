import React, { useState, useContext, useEffect } from "react";
import { FontSizeContext } from "../../Helper/Context";
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import "../Styles/InfoPage.css";
import ImageUploading from "react-images-uploading";
import { saveImageInfoPageAction, getImagesInfoPageAction, updateImageInfoPageAction, deleteImageInfoPageAction, removeAllImagesInfoPageAction, saveVideoAction, getVideosAction } from "../../tool/actions"

const DiseaseInformationPage = () => {
  const { fontSize, setFontSize } = useContext(FontSizeContext)
  const [images, setImages] = React.useState([]);
  const maxNumber = 2;
  const [removeFlag, setRemoveFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [video1, setVideo1] = React.useState([]);
  const [video2, setVideo2] = React.useState([]);

  let userTypeId = sessionStorage.getItem('userTypeId')

  const getVideos = async () => {
    var jsonData1 = {
      "data": [{
        "ind": 1,
        "page": "i",
      }]
    }
    let video1 = await getVideosAction(jsonData1);

    setVideo1(video1[0]["data_url"])
    var jsonData2 = {
      "data": [{
        "ind": 2,
        "page": "i",
      }]
    }
    let video2 = await getVideosAction(jsonData2);
    setVideo2(video2[0]["data_url"])
  };

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const getImages = async () => {
    let result = await getImagesInfoPageAction();
    setImages(result);
  };

  useEffect(async () => {
    await getImages();
    await getVideos();

  }, []);

  useEffect(async () => {
    if (removeFlag) {
      if (images !== null) {
        await removeImage();
      }
    }

  }, [images]);

  useEffect(async () => {
    if (updateFlag) {
      if (images !== null) {
        await updateImage();
      }
    }

  }, [images]);

  async function saveImage(image, index) {
    var jsonData = {
      "data": [{
        "data_url": image.data_url,
        "index": index,
      }]
    }

    const a = await saveImageInfoPageAction(jsonData);
    await getImages();

  }

  async function updateImage() {
    for (let index = 0; index < 2; index++) {

      if (images[index]) {
        const image = images[index];
        var jsonData = {
          "data": [{
            "Img_base64": image.data_url,
            "Index": index,
          }]
        }
        const a = await updateImageInfoPageAction(jsonData);
      }
    }
    setUpdateFlag(false);

  }

  async function removeImage() {
    for (let index = 0; index < 2; index++) {

      if (images[index]) {
        const image = images[index];
        var jsonData = {
          "data": [{
            "Img_base64": image.data_url,
            "Index": index,
          }]
        }
        const a = await updateImageInfoPageAction(jsonData);
      } else {
        var jsonData = {
          "data": [{
            "Index": index,
          }]
        }
        const a = await deleteImageInfoPageAction(jsonData);

      }
    }
    setRemoveFlag(false);
  }

  async function onImageRemoveAllButton() {

    const a = await removeAllImagesInfoPageAction();
    window.location.reload(false);

  }

  async function saveVideo1(video1) {
    var jsonData = {
      "data": [{
        "video": video1,
        "ind": 1,
        "page": "i",
      }]
    }

    const a = await saveVideoAction(jsonData);
    window.location.reload(false);


  }

  async function saveVideo2(video2) {
    var jsonData = {
      "data": [{
        "video": video2,
        "ind": 2,
        "page": "i",
      }]
    }
    const a = await saveVideoAction(jsonData);
    window.location.reload(false);


  }

  return (
    // <h1>Disease Information Page</h1>
    <div>
      <div className="leftPhotos">
        <div className="image-item">
          {userTypeId === '3' ? (
            <div>
              <input type="text" name="video1" id="video1" placeholder="Videonun Youtube Linkini Giriniz" style={{ "margin-left": "10%", "width": "70%" }}></input>
              <button style={{"margin-left":"1%"}} onClick={() => { saveVideo1(document.getElementById("video1").value) }}>Kaydet</button>
            </div>
          ) : (
            null
          )}

          <iframe className="photoLeft" type="text/html" width="" height=""
            src={video1}
            frameborder="0" allowfullscreen="allowfullscreen"></iframe>
        
        </div>
        <div className="image-item">
        {userTypeId === '3' ? (
            <div>
          <input type="text" name="video2" id="video2" placeholder="Videonun Youtube Linkini Giriniz" style={{ "margin-left": "10%", "width": "70%", "margin-top":"13%" }}></input>
          <button style={{"margin-left":"1%"}} onClick={() => { saveVideo2(document.getElementById("video2").value) }}>Kaydet</button>
          </div>
          ) : (
            null
          )}

          <iframe className="photoLeft" type="text/html" width="" height=""
            src={video2}
            frameborder="0" allowfullscreen="allowfullscreen"></iframe>       
        </div>
      </div>
      <div className="informationPageLayout">
        <div className="informationPageDiv2" style={{ "grid-row-start": "2", "font-size": fontSize, "line-height": "1.8" }}>
          <h1 style={{ "font-size": fontSize * 1.5 }}>Demans Türleri</h1>
          <div>Demansa sebep olan birçok hastalık vardır. Alzheimer hastalığı bunlardan en yaygın olanıdır ve demans vakalarının %60-%70’ini oluşturur (W.H.O., 2020). Bunun dışında, vasküler demans, lewy cisimcikli demans, fronto-temporal demans gibi türleri de tüm dünyada sıklıkla görülür.
          </div>
          <br></br>
          <div><b>Alzheimer Hastalığı: </b>Bu hastalık, ilerleyici hafıza bozukluğu ile birlikte bilişsel, davranışsal ve nöro-psikiyatrik değişimlerin sosyal fonksiyonları ve günlük yaşam aktivitelerini olumsuz etkilediği klinik bir tablo olarak tanımlanır (Dubois et al., 2010). Tanılanmasında en fazla göze çarpan semptom, yakın geçmiş olayları hatırlayamama iken ilerleyen evrelerde uzak geçmişe ait hafıza kayıpları da ortaya çıkar. İleri evrelerde yürüme, yemek yeme, konuşma zorlukları ve kişilik değişimleri görülür (CDC, 2019).
          </div>
          <br></br>
          <div><b>Vasküler Demans: </b> Alzheimer hastalığından sonra ikinci en sık görülen ve tüm vakaların %15’ini oluşturan demans türüdür (CDC, 2019). Vasküler demans, damarlarda  tıkanıklık ve ölü hücre alanlarının oluşması sonucu gelişebilir. Bu demans türü vasküler bilişsel yetersizlik olarak da adlandırılabilmektedir. Tanı alan bireyler, beyin bölgesinin etkilendiği alana göre farklı semptomlar gösterir. Bu demans türü için risk faktörleri; diyabet, hipertansiyon ve yüksek kolesteroldür (CDC, 2019).
          </div>
          <br></br>
          <div><b>Lewy Cisimcikli Demans: </b>Lewy cisimcikli demans (LCD); uyku, kognitif, denge ve hareket bozuklukları ile birlikte nöropsikiyatrik semptomların (konfüzyon, halüsinasyon gibi) eşlik ettiği bir demans türüdür (Taylor et al., 2020). LCD’nin Hafıza kaybı ve oryantasyon bozukluğu gibi Alzheimer’a benzer belirtileri de vardır (Rahman & Howard, 2018).
          </div>
          <br></br>
          <div><b>Fronto-Temporal Demans: </b>Bu hastalık, daha genç yaşlarda görülen (&lt;65 yaş), davranış bozuklukları (aşırı yemek yeme, sosyal davranışlarda ve karakterde değişim, konuşma bozukluğu vb.) ve nöropsikiyatrik belirtiler gösteren bir demans türüdür (Bang, Spina, &amp; Miller, 2015).
          </div>
        </div>
      </div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {userTypeId === '3' ? (

              <button
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Fotoğraf Yüklemek için Tıkla
              </button>
            ) : (
              null
            )}
            &nbsp;
            {userTypeId === '3' ? (
              <button onClick={onImageRemoveAllButton}>Tüm Resimleri Kaldır</button>
            ) : (
              null
            )}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img className="photo" src={image.data_url} alt="" width="" />
                {userTypeId === '3' ? (

                  <div className="image-item__btn-wrapper">
                    <button className="updateImage" onClick={() => { onImageUpdate(index); setUpdateFlag(true) }}>Güncelle</button>
                    <button className="updateImage" onClick={() => { onImageRemove(index); setRemoveFlag(true) }}>Kaldır</button>
                    <button onClick={() => saveImage(image, index)}>Kaydet</button>

                  </div>
                ) : (
                  null
                )}
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default DiseaseInformationPage;