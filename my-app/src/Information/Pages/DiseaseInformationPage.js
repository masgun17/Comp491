import React, { useState, useContext, useEffect } from "react";
import { FontSizeContext } from "../../Helper/Context";
import ZoomIn from "@material-ui/icons/ZoomIn";
import ZoomOut from "@material-ui/icons/ZoomOut";
import "../Styles/InfoPage.css";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageUploading from "react-images-uploading";
import {
  saveImageInfoPageAction,
  getImagesInfoPageAction,
  updateImageInfoPageAction,
  deleteImageInfoPageAction,
  removeAllImagesInfoPageAction,
  saveVideoAction,
  getVideosAction,
} from "../../tool/actions";

const DiseaseInformationPage = () => {
  const { fontSize, setFontSize } = useContext(FontSizeContext);  //To share the font-size of all of the text between the components and pages
  const [images, setImages] = React.useState([]); //Variable that stores images
  const maxNumber = 2;  //Max number of videos or images can be seen on the page
  const [removeFlag, setRemoveFlag] = useState(false);  //Boolean keeps whether the user clicked a remove button or not
  const [updateFlag, setUpdateFlag] = useState(false);  //Boolean keeps whether the user clicked an update button or not
  const [video1, setVideo1] = React.useState([]); //Variable that stores src of the first video
  const [video2, setVideo2] = React.useState([]); //Variable that stores src of the second video

  const [confirmDeleteShow, setConfirmDeleteShow] = useState(false);  //Show pop-up page when user wants to delete an image 
  const [confirmDeleteAllShow, setConfirmDeleteAllShow] = useState(false);  //Show pop-up page when user wants to delete all of the images
  const [currentIndex, setCurrentIndex] = useState(); //Keeps index for the images when any button clicked around the images

  let userTypeId = sessionStorage.getItem("userTypeId");  //Getting user's type id. If the user is super-admin, the user can change videos and images.

  const getVideos = async () => { //Function for getting data_url of the video from the database 
    var jsonData1 = {
      data: [
        {
          ind: 1, //Represents that it is first video
          page: "i",  //Represents that it is on the information page (i)
        },
      ],
    };
    let video1 = await getVideosAction(jsonData1);  //API call for getting the data_url of the first video from the database

    setVideo1(video1[0]["data_url"]);
    var jsonData2 = {
      data: [
        {
          ind: 2,//Represents that it is second video
          page: "i",//Represents that it is on the information page (i)
        },
      ],
    };
    let video2 = await getVideosAction(jsonData2);
    setVideo2(video2[0]["data_url"]);
  };

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const getImages = async () => {//Function for getting src of the images from the database 
    let result = await getImagesInfoPageAction(); //API call for getting the src of the images from the database
    setImages(result);
  };

  useEffect(async () => { //Getting videos and images while page is loading
    await getImages();
    await getVideos();
  }, []);

  useEffect(async () => { //Run this when there are changes in the images array
    if (removeFlag) { //If the user wanted to remove an image
      if (images !== null) {
        await removeImage(); //Function call for removing an image
      }
    }
  }, [images]); //Function call for updating the image list

  useEffect(async () => { //Run this when there are changes in the images array
    if (updateFlag) { //If the user wanted update image
      if (images !== null) { 
        await updateImage(); //Function call for updating the image list
      }
    }
  }, [images]); 

  async function saveImage(image, index) { //Saving image
    var jsonData = { //request's data
      data: [
        {
          data_url: image.data_url, //data_url of the image
          index: index, //index of the image (the place where the image will be located)
        },
      ],
    };

    const a = await saveImageInfoPageAction(jsonData); //API call for saving the image for that index
    await getImages();//Getting images from the database again to update the screen
  }

  async function updateImage() {//Updating the image 
    for (let index = 0; index < 2; index++) {
      if (images[index]) {
        const image = images[index];
        var jsonData = {
          data: [
            {
              Img_base64: image.data_url, //data_url of the image
              Index: index,//index of the image (the place where the image will be located)
            },
          ],
        };
        const a = await updateImageInfoPageAction(jsonData); //API call for updating the image for that index
      }
    }
    setUpdateFlag(false); //Update is done
  }

  async function removeImage() {//Function for removing images and updating the rest of the images' indexes
    for (let index = 0; index < 2; index++) { //Looping through all of the images
      if (images[index]) {
        const image = images[index];
        var jsonData = {  //request's data
          data: [
            {
              Img_base64: image.data_url, //data_url of the image
              Index: index, //index of the image (the place where the image will be located)
            },
          ],
        };
        const a = await updateImageInfoPageAction(jsonData);  //API call for updating the rest of the images' indexes
      } else {
        var jsonData = {//request's data
          data: [
            {
              Index: index, //index of the image (the place where the image will be located)
            },
          ],
        };
        const a = await deleteImageInfoPageAction(jsonData);  //API call for deleting the requested image
      }
    }
    setRemoveFlag(false); //Deleting the image is done
  }

  async function onImageRemoveAllButton() { //Removing all of the images
    const a = await removeAllImagesInfoPageAction();  //API call for removing all of the images
    window.location.reload(false);  //Reloading the page
  }

  async function saveVideo1(video1) { //Function for saving the first video
    var jsonData = {
      data: [
        {
          video: video1,//src of the video
          ind: 1,//index of the video on the page
          page: "i",//which page the video will be shown (info)
        },
      ],
    };

    const a = await saveVideoAction(jsonData);//API call for saving the first video
    window.location.reload(false);//Reloading the page
  }

  async function saveVideo2(video2) {//Function for saving the second video
    var jsonData = {
      data: [
        {
          video: video2,//src of the video
          ind: 2,//index of the video on the page
          page: "i",//which page the video will be shown (info)
        },
      ],
    };
    const a = await saveVideoAction(jsonData);//API call for saving the second video
    window.location.reload(false);//Reloading the page
  }

  return (
    // <h1>Disease Information Page</h1>
    <div>
      <div className="leftPhotos">
        <div className="image-item">
          {userTypeId === "3" ? (
            <div>
              <input
                type="text"
                name="video1"
                id="video1"
                placeholder="Videonun Youtube Linkini Giriniz"
                style={{ "margin-left": "10%", width: "70%" }}
              ></input>
              <button
                style={{ "margin-left": "1%" }}
                onClick={() => {
                  saveVideo1(document.getElementById("video1").value);
                }}
              >
                Kaydet
              </button>
            </div>
          ) : null}

          <iframe
            className="photoLeft"
            type="text/html"
            width=""
            height=""
            src={video1}
            frameborder="0"
            allowfullscreen="allowfullscreen"
          ></iframe>
        </div>
        <div className="image-item">
          {userTypeId === "3" ? (
            <div>
              <input
                type="text"
                name="video2"
                id="video2"
                placeholder="Videonun Youtube Linkini Giriniz"
                style={{
                  "margin-left": "10%",
                  width: "70%",
                  "margin-top": "13%",
                }}
              ></input>
              <button
                style={{ "margin-left": "1%" }}
                onClick={() => {
                  saveVideo2(document.getElementById("video2").value);
                }}
              >
                Kaydet
              </button>
            </div>
          ) : null}

          <iframe
            className="photoLeft"
            type="text/html"
            width=""
            height=""
            src={video2}
            frameborder="0"
            allowfullscreen="allowfullscreen"
          ></iframe>
        </div>
      </div>
      <div className="informationPageLayout">
        <div
          className="informationPageDiv2"
          style={{
            "grid-row-start": "2",
            "font-size": fontSize,
            "line-height": "1.8",
          }}
        >
          <h1 style={{ "font-size": fontSize * 1.5 }}>Demans T??rleri</h1>
          <div>
            Demansa sebep olan bir??ok hastal??k vard??r. Alzheimer hastal??????
            bunlardan en yayg??n olan??d??r ve demans vakalar??n??n %60-%70???ini
            olu??turur (W.H.O., 2020). Bunun d??????nda, vask??ler demans, lewy
            cisimcikli demans, fronto-temporal demans gibi t??rleri de t??m
            d??nyada s??kl??kla g??r??l??r.
          </div>
          <br></br>
          <div>
            <b>Alzheimer Hastal??????: </b>Bu hastal??k, ilerleyici haf??za bozuklu??u
            ile birlikte bili??sel, davran????sal ve n??ro-psikiyatrik de??i??imlerin
            sosyal fonksiyonlar?? ve g??nl??k ya??am aktivitelerini olumsuz
            etkiledi??i klinik bir tablo olarak tan??mlan??r (Dubois et al., 2010).
            Tan??lanmas??nda en fazla g??ze ??arpan semptom, yak??n ge??mi?? olaylar??
            hat??rlayamama iken ilerleyen evrelerde uzak ge??mi??e ait haf??za
            kay??plar?? da ortaya ????kar. ??leri evrelerde y??r??me, yemek yeme,
            konu??ma zorluklar?? ve ki??ilik de??i??imleri g??r??l??r (CDC, 2019).
          </div>
          <br></br>
          <div>
            <b>Vask??ler Demans: </b> Alzheimer hastal??????ndan sonra ikinci en s??k
            g??r??len ve t??m vakalar??n %15???ini olu??turan demans t??r??d??r (CDC,
            2019). Vask??ler demans, damarlarda t??kan??kl??k ve ??l?? h??cre
            alanlar??n??n olu??mas?? sonucu geli??ebilir. Bu demans t??r?? vask??ler
            bili??sel yetersizlik olarak da adland??r??labilmektedir. Tan?? alan
            bireyler, beyin b??lgesinin etkilendi??i alana g??re farkl?? semptomlar
            g??sterir. Bu demans t??r?? i??in risk fakt??rleri; diyabet,
            hipertansiyon ve y??ksek kolesterold??r (CDC, 2019).
          </div>
          <br></br>
          <div>
            <b>Lewy Cisimcikli Demans: </b>Lewy cisimcikli demans (LCD); uyku,
            kognitif, denge ve hareket bozukluklar?? ile birlikte n??ropsikiyatrik
            semptomlar??n (konf??zyon, hal??sinasyon gibi) e??lik etti??i bir demans
            t??r??d??r (Taylor et al., 2020). LCD???nin Haf??za kayb?? ve oryantasyon
            bozuklu??u gibi Alzheimer???a benzer belirtileri de vard??r (Rahman &
            Howard, 2018).
          </div>
          <br></br>
          <div>
            <b>Fronto-Temporal Demans: </b>Bu hastal??k, daha gen?? ya??larda
            g??r??len (&lt;65 ya??), davran???? bozukluklar?? (a????r?? yemek yeme,
            sosyal davran????larda ve karakterde de??i??im, konu??ma bozuklu??u vb.)
            ve n??ropsikiyatrik belirtiler g??steren bir demans t??r??d??r (Bang,
            Spina, &amp; Miller, 2015).
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
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {userTypeId === "3" ? (
              <button
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Foto??raf Y??klemek i??in T??kla
              </button>
            ) : null}
            &nbsp;
            {userTypeId === "3" ? (
              <button onClick={() => setConfirmDeleteAllShow(true)}>
                T??m Resimleri Kald??r
              </button>
            ) : null}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img className="photo" src={image.data_url} alt="" width="" />
                {userTypeId === "3" ? (
                  <div className="image-item__btn-wrapper">
                    <button
                      className="updateImage"
                      onClick={() => {
                        onImageUpdate(index);
                        setUpdateFlag(true);
                      }}
                    >
                      G??ncelle
                    </button>
                    <button
                      className="updateImage"
                      onClick={() => {
                        setCurrentIndex(index);
                        setConfirmDeleteShow(true);
                      }}
                    >
                      Kald??r
                    </button>
                    <button onClick={() => saveImage(image, index)}>
                      Kaydet
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
            {confirmDeleteShow && (
              <Modal
                centered
                contentClassName="confirmDeleteModal"
                // contentClassName="custom-modal-content"
                // dialogClassName="custom-modal-dialogue"
                show={confirmDeleteShow}
              >
                <div className="confirmText">
                  Bu resmi silmek istedi??inize emin misiniz?
                </div>
                <div className="confirmPopup">
                  <button
                    className="confirmModalButton"
                    type="button"
                    onClick={() => {
                      setConfirmDeleteShow(false);
                    }}
                  >
                    Vazge??
                  </button>
                  <button
                    className="confirmModalButton"
                    type="button"
                    onClick={() => {
                      setConfirmDeleteShow(false);
                      onImageRemove(currentIndex);
                      setRemoveFlag(true);
                    }}
                  >
                    Sil
                  </button>
                </div>
              </Modal>
            )}
            {confirmDeleteAllShow && (
              <Modal
                centered
                contentClassName="confirmDeleteModal"
                // contentClassName="custom-modal-content"
                // dialogClassName="custom-modal-dialogue"
                show={confirmDeleteAllShow}
              >
                <div className="confirmText">
                  B??t??n resimleri silmek istedi??inize emin misiniz?
                </div>
                <div className="confirmPopup">
                  <button
                    className="confirmModalButton"
                    type="button"
                    onClick={() => {
                      setConfirmDeleteAllShow(false);
                     
                    }}
                  >
                    Vazge??
                  </button>
                  <button
                    className="confirmModalButton"
                    type="button"
                    onClick={() => {
                      setConfirmDeleteShow(false);
                      onImageRemoveAllButton();
                    }}
                  >
                    Sil
                  </button>
                </div>
              </Modal>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default DiseaseInformationPage;
