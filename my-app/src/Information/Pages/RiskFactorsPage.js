import React, { useState, useContext, useEffect } from "react";
import { FontSizeContext } from "../../Helper/Context";
import "../Styles/InfoPage.css";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageUploading from "react-images-uploading";
import { saveImageRiskPageAction, getImagesRiskPageAction, updateImageRiskPageAction, deleteImageRiskPageAction, removeAllImagesRiskPageAction , saveVideoAction, getVideosAction} from "../../tool/actions"

const RiskFactorsPage = () => {
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

  let userTypeId = sessionStorage.getItem('userTypeId') //Getting user's type id. If the user is super-admin, the user can change videos and images.

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const getVideos = async () => {//Function for getting data_url of the video from the database
    var jsonData1 = {
      "data": [{
        "ind": 1,//Represents that it is first video
        "page": "r", //Represents that it is on the risk factors page (r)
      }]
    }
    let video1 = await getVideosAction(jsonData1);  //API call for getting the data_url of the first video from the database
    
    setVideo1(video1[0]["data_url"])
    var jsonData2 = {
      "data": [{
        "ind": 2,//Represents that it is second video
        "page": "r",  //Represents that it is on the risk factors page (r)
      }]
    }
    let video2 = await getVideosAction(jsonData2);
    setVideo2(video2[0]["data_url"])
  };
  const getImages = async () => {//Function for getting src of the images from the database 
    let result = await getImagesRiskPageAction();//API call for getting the src of the images from the database
    setImages(result);
  };

  useEffect(async () => {//Getting videos and images while page is loading
    await getImages();
    await getVideos();

  }, []);

  useEffect(async () => { //Run this when there are changes in the images array
    if (removeFlag) { //If the user wanted to remove an image
      if (images !== null) {
        await removeImage(); //Function call for removing an image
      }
    }
  }, [images]); 

  useEffect(async () => { //Run this when there are changes in the images array
    if (updateFlag) { //If the user wanted update image
      if (images !== null) { 
        await updateImage(); //Function call for updating the image list
      }
    }
  }, [images]); 

  async function saveImage(image, index) {//Saving image
    var jsonData = {
      "data": [{
        "data_url": image.data_url,//data_url of the image
        "index": index,//index of the image (the place where the image will be located)
      }]
    }

    const a = await saveImageRiskPageAction(jsonData);//API call for saving the image for that index
    await getImages();//Getting images from the database again to update the screen

  }

  async function updateImage() {//Updating the image 
    for (let index = 0; index < 2; index++) {

      if (images[index]) {
        const image = images[index];
        var jsonData = {
          "data": [{
            "Img_base64": image.data_url,//data_url of the image
            "Index": index,//index of the image (the place where the image will be located)
          }]
        }
        const a = await updateImageRiskPageAction(jsonData);//API call for updating the image for that index
      }
    }
    setUpdateFlag(false);

  }

  async function removeImage() {  //Function for removing images and updating the rest of the images' indexes
    for (let index = 0; index < 2; index++) {

      if (images[index]) {
        const image = images[index];
        var jsonData = {
          "data": [{
            "Img_base64": image.data_url,//data_url of the image
            "Index": index,//index of the image (the place where the image will be located)
          }]
        }
        const a = await updateImageRiskPageAction(jsonData);//API call for updating the rest of the images' indexes
      } else {
        var jsonData = {
          "data": [{
            "Index": index,
          }]
        }
        const a = await deleteImageRiskPageAction(jsonData);//API call for deleting the requested image

      }
    }
    setRemoveFlag(false); //Deleting the image is done
  }

  async function onImageRemoveAllButton() {//Removing all of the images

    const a = await removeAllImagesRiskPageAction();//API call for removing all of the images
    window.location.reload(false);//Reloading the page

  }

  async function saveVideo1(video1) {//Function for saving the first video
    var jsonData = {
      "data": [{
        "video": video1,//src of the video
        "ind": 1,//index of the video on the page
        "page": "r",//which page the video will be shown (risk factors)
      }]
    }

    const a = await saveVideoAction(jsonData);//API call for saving the first video
    window.location.reload(false);//Reloading the page

  
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
          <h1 style={{ "font-size": fontSize * 1.5 }}>Risk Fakt??rleri </h1>
          Risk, risk fakt??r??ne maruz kalmaya ba??l?? bir sonu?? geli??tirme olas??l??????d??r. Uluslararas?? ara??t??rma literat??r??n??n kapsaml?? olarak incelenmesinde, Alzheimer hastal?????? i??in hem risk hem de koruyucu fakt??rler oldu??u belirlenmi??tir. Teste dahil edilen risk fakt??rleri ve koruyucu fakt??rler, ??uana kadar yap??lan ??al????malardan elde edilen sonu??lard??r. Alzheimer hastal?????? i??in tan??mlanm???? koruyucu fakt??rler ve risk fakt??rleri ??unlar?? i??erir:
          <br /><br />
          <div style={{ "align-self": "flex-start" }}>
            <h3 style={{ "font-size": fontSize }}>Koruyucu Fakt??rler</h3>
            <ul>
              <li>
                Hafif ila orta derecede alkol t??ketimi
              </li>
              <li>
                Y??ksek fiziksel aktivite
              </li>
              <li>
                Bili??sel aktivite
              </li>
              <li>
                Y??ksek oranda bal??k t??ketimi
              </li>
            </ul>
          </div>

          <div style={{ "align-self": "flex-start" }}>
            <h3 style={{ "font-size": fontSize }}>Risk fakt??rleri</h3>
            <ul>
              <li>
                Artan ya??
              </li>
              <li>
                Kad??n cinsiyeti
              </li>
              <li>
                D??????k e??itim
              </li>
              <li>
                Orta ya??ta a????r?? kilolu ve obez olma
              </li>
              <li>
                Diyabet
              </li>
              <li>
                Depresyon
              </li>
              <li>
                Orta ya??ta y??ksek serum kolesterol??
              </li>
              <li>
                Travmatik beyin hasar??
              </li>
              <li>
                Mevcut sigara kullan??m??
              </li>
              <li>
                D??????k sosyalle??me oran??
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
                Foto??raf Y??klemek i??in T??kla
              </button>
            ) : (
              null
            )}
            &nbsp;
            {userTypeId === '3' ? (
              <button onClick={() => setConfirmDeleteAllShow(true)}>T??m Resimleri Kald??r</button>
            ) : (
              null
            )}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img className="photo" src={image.data_url} alt="" width="" />
                {userTypeId === '3' ? (

                  <div className="image-item__btn-wrapper">
                    <button className="updateImage" onClick={() => { onImageUpdate(index); setUpdateFlag(true) }}>G??ncelle</button>
                    <button className="updateImage" onClick={() => { setCurrentIndex(index); setConfirmDeleteShow(true) }}>Kald??r</button>
                    <button onClick={() => saveImage(image, index)}>Kaydet</button>

                  </div>
                ) : (
                  null
                )}
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

export default RiskFactorsPage;