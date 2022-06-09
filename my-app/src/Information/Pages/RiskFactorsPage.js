import React, { useState, useContext, useEffect } from "react";
import { FontSizeContext } from "../../Helper/Context";
import "../Styles/InfoPage.css";
import ImageUploading from "react-images-uploading";
import { saveImageRiskPageAction, getImagesRiskPageAction, updateImageRiskPageAction, deleteImageRiskPageAction, removeAllImagesRiskPageAction , saveVideoAction, getVideosAction} from "../../tool/actions"

const RiskFactorsPage = () => {
  const { fontSize, setFontSize } = useContext(FontSizeContext)
  const [images, setImages] = React.useState([]);
  const maxNumber = 2;
  const [removeFlag, setRemoveFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [video1, setVideo1] = React.useState([]);
  const [video2, setVideo2] = React.useState([]);
  let userTypeId = sessionStorage.getItem('userTypeId')

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const getVideos = async () => {
    var jsonData1 = {
      "data": [{
        "ind": 1,
        "page": "r",
      }]
    }
    let video1 = await getVideosAction(jsonData1);
    
    setVideo1(video1[0]["data_url"])
    var jsonData2 = {
      "data": [{
        "ind": 2,
        "page": "r",
      }]
    }
    let video2 = await getVideosAction(jsonData2);
    setVideo2(video2[0]["data_url"])
  };
  const getImages = async () => {
    let result = await getImagesRiskPageAction();
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

    const a = await saveImageRiskPageAction(jsonData);
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
        const a = await updateImageRiskPageAction(jsonData);
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
        const a = await updateImageRiskPageAction(jsonData);
      } else {
        var jsonData = {
          "data": [{
            "Index": index,
          }]
        }
        const a = await deleteImageRiskPageAction(jsonData);

      }
    }
    setRemoveFlag(false);
  }

  async function onImageRemoveAllButton() {

    const a = await removeAllImagesRiskPageAction();
    window.location.reload(false);

  }

  async function saveVideo1(video1) {
    var jsonData = {
      "data": [{
        "video": video1,
        "ind": 1,
        "page": "r",
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
        "page": "r",
      }]
    }
    const a = await saveVideoAction(jsonData);
    window.location.reload(false);

  
  }
  return (
    // <h1>Risk Factors Page</h1>
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
            frameborder="0" allowfullscreen="allowfullscreen"></iframe>       </div>
      </div>

      <div className="informationPageLayout" style={{ "font-size": fontSize }}>
        <div className="informationPageDiv2" style={{ "grid-row-start": "2", "font-size": fontSize, "line-height": "1.8" }}>
          <h1 style={{ "font-size": fontSize * 1.5 }}>Risk Faktörleri </h1>
          Risk, risk faktörüne maruz kalmaya bağlı bir sonuç geliştirme olasılığıdır. Uluslararası araştırma literatürünün kapsamlı olarak incelenmesinde, Alzheimer hastalığı için hem risk hem de koruyucu faktörler olduğu belirlenmiştir. Teste dahil edilen risk faktörleri ve koruyucu faktörler, şuana kadar yapılan çalışmalardan elde edilen sonuçlardır. Alzheimer hastalığı için tanımlanmış koruyucu faktörler ve risk faktörleri şunları içerir:
          <br /><br />
          <div style={{ "align-self": "flex-start" }}>
            <h3 style={{ "font-size": fontSize }}>Koruyucu Faktörler</h3>
            <ul>
              <li>
                Hafif ila orta derecede alkol tüketimi
              </li>
              <li>
                Yüksek fiziksel aktivite
              </li>
              <li>
                Bilişsel aktivite
              </li>
              <li>
                Yüksek oranda balık tüketimi
              </li>
            </ul>
          </div>

          <div style={{ "align-self": "flex-start" }}>
            <h3 style={{ "font-size": fontSize }}>Risk faktörleri</h3>
            <ul>
              <li>
                Artan yaş
              </li>
              <li>
                Kadın cinsiyeti
              </li>
              <li>
                Düşük eğitim
              </li>
              <li>
                Orta yaşta aşırı kilolu ve obez olma
              </li>
              <li>
                Diyabet
              </li>
              <li>
                Depresyon
              </li>
              <li>
                Orta yaşta yüksek serum kolesterolü
              </li>
              <li>
                Travmatik beyin hasarı
              </li>
              <li>
                Mevcut sigara kullanımı
              </li>
              <li>
                Düşük sosyalleşme oranı
              </li>
              <li>
                Pestisit maruziyeti
              </li>
            </ul>
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

export default RiskFactorsPage;