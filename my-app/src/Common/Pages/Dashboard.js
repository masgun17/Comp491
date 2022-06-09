import React, { useState, useEffect, useContext } from "react";
import { FontSizeContext } from "../../Helper/Context";
import "../Styles/Dashboard.css";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageUploading from "react-images-uploading";
import {
  saveImageAction,
  getImagesAction,
  updateImageAction,
  deleteImageAction,
  removeAllImagesAction,
  saveVideoAction,
  getVideosAction,
} from "../../tool/actions";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { fontSize, setFontSize } = useContext(FontSizeContext); //To share the font-size of all of the text between the components and pages
  const [font, setFont] = useState(20);
  const [images, setImages] = React.useState([]); //Variable that stores images
  const [tempImages, setTempImages] = useState([]); 
  const [video1, setVideo1] = React.useState([]); //Variable that stores src of the first video
  const [video2, setVideo2] = React.useState([]); //Variable that stores src of the second video
  const maxNumber = 2; //Max number of videos or images can be seen on the page
  const [removeFlag, setRemoveFlag] = useState(false); //Boolean keeps whether the user clicked a remove button or not
  const [updateFlag, setUpdateFlag] = useState(false); //Boolean keeps whether the user clicked an update button or not
  const [confirmDeleteShow, setConfirmDeleteShow] = useState(false); //Show pop-up page when user wants to delete an image
  const [confirmDeleteAllShow, setConfirmDeleteAllShow] = useState(false); //Show pop-up page when user wants to delete all of the images
  const [currentIndex, setCurrentIndex] = useState(); //Keeps index for the images when any button clicked around the images

  let userTypeId = sessionStorage.getItem("userTypeId"); //Getting user's type id. If the user is super-admin, the user can change videos and images.

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const getImages = async () => { //Function for getting src of the images from the database 
    let result = await getImagesAction(); //API call for getting the src of the images from the database
    setImages(result);
  };

  const getVideos = async () => { //Function for getting data_url of the video from the database 
    var jsonData1 = { //first request's data
      data: [
        {
          ind: 1, //Represents that it is first video
          page: "d", //Represents that it is on the dashboard (d)
        },
      ],
    };
    let video1 = await getVideosAction(jsonData1); //API call for getting the data_url of the first video from the database

    setVideo1(video1[0]["data_url"]);
    var jsonData2 = { //second request's data
      data: [
        {
          ind: 2, //Represents that it is second video
          page: "d", //Represents that it is on the dashboard (d)
        },
      ],
    };
    let video2 = await getVideosAction(jsonData2);  //API call for getting the data_url of the second video from the database
    setVideo2(video2[0]["data_url"]);
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
  }, [images]); 

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

    const a = await saveImageAction(jsonData); //API call for saving the image for that index
    await getImages(); //Getting images from the database again to update the screen
  }

  async function updateImage() { //Updating the image 
    for (let index = 0; index < 2; index++) {
      if (images[index]) {
        const image = images[index];
        var jsonData = {
          data: [
            {
              Img_base64: image.data_url, //data_url of the image
              Index: index, //index of the image (the place where the image will be located)
            }, 
          ],
        };
        const a = await updateImageAction(jsonData); //API call for updating the image for that index
      }
    }
    setUpdateFlag(false); //Update is done
  }

  function restoreImage() {
    setImages(tempImages);
  }

  async function removeImage() { //Function for removing images and updating the rest of the images' indexes
    for (let index = 0; index < 3; index++) { //Looping through all of the images
      if (images[index]) {
        const image = images[index];
        var jsonData = { //request's data
          data: [
            {
              Img_base64: image.data_url, //data_url of the image
              Index: index, //index of the image (the place where the image will be located)
            },
          ],
        };
        const a = await updateImageAction(jsonData); //API call for updating the rest of the images' indexes
      } else {
        var jsonData = { //request's data
          data: [
            {
              Index: index, //index of the image (the place where the image will be located)
            },
          ],
        };
        const a = await deleteImageAction(jsonData); //API call for deleting the requested image
      }
    }
    setRemoveFlag(false); //Deleting the image is done
  }

  async function onImageRemoveAllButton() { //Removing all of the images
    const a = await removeAllImagesAction(); //API call for removing all of the images
    window.location.reload(false); //Reloading the page
  }

  async function saveVideo1(video1) { //Function for saving the first video
    var jsonData = { //request's data
      data: [
        {
          video: video1, //src of the video
          ind: 1, //index of the video on the page
          page: "d", //which page the video will be shown (d=dashboard)
        },
      ],
    };

    const a = await saveVideoAction(jsonData); //API call for saving the first video
    window.location.reload(false); //Reloading the page
  }

  async function saveVideo2(video2) { //Function for saving the second video
    var jsonData = { //request's data
      data: [
        {
          video: video2, //src of the video
          ind: 2, //index of the video on the page
          page: "d", //which page the video will be shown (d=dashboard)
        },
      ],
    };
    const a = await saveVideoAction(jsonData); //API call for saving the second video
    window.location.reload(false); //Reloading the page
  }
  return (
    // <h1>Dashboard</h1>;
    <div className="wrapper">
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
          ></iframe>{" "}
        </div>
      </div>

      <div className="dashboardLayout" style={{ "font-size": fontSize }}>
        <div className="dashboardDiv2" style={{ "grid-row-start": "2" }}>
          <h1 style={{ "font-size": fontSize * 1.5 }}>Demans Nedir?</h1>
          <div>
            Demans, beyindeki bir kısım hücrelerin çalışması durduğunda ya da
            işlev görmediğinde görülen semptomlar topluluğunu tanımlamak için
            kullanılan bir terimdir. Günlük aktivitelerin gerçekleştirilmesinde
            gerekli olan beceriler ile hafıza, davranış, düşünme süreçlerinin
            bozulduğu bir sendromdur. Günlük yaşamı ve fonksiyonları aksatacak
            kadar bilişsel fonksiyonların ilerleyici olarak kaybedilmesi ile
            karakterizedir. Demans, beyini birincil veya ikincil olarak
            etkileyen birçok hastalığın (Alzheimer, inme vb.) sonucu olarak
            ortaya çıkar (Rahman & Howard, 2018; Rahman, Howard, Harrison
            Dening, & Swaffer, 2018; W.H.O., 2020).{" "}
          </div>
          <br></br>
          <ul style={{ "font-size": fontSize }}>
            <li>Demans, yaşlanmanın normal bir parçası değildir.</li>
            <li>
              'Demans' ve 'Alzheimer hastalığı' terimleri aynı anlama gelmez.
              Demans, beyni etkileyen 100'den fazla farklı hastalıkla ilişkili
              bir sendromu tanımlayan şemsiye bir terimdir.{" "}
            </li>
            <li>
              Demans genellikle zihinsel veya bilişsel işlev kaybıyla
              ilişkilidir.{" "}
            </li>
            <li>65 yaşından küçük yetişkinlerde de demans görülebilir. </li>
            <li>
              Yaşam stilimizle ilgili risk faktörlerinde azalma ve koruyucu
              faktörlerde artış demans geliştirme şansını azaltabilir.{" "}
            </li>
          </ul>
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
                Fotoğraf Yüklemek için Tıkla
              </button>
            ) : null}
            &nbsp;
            {userTypeId === "3" ? (
              <button onClick={() => setConfirmDeleteAllShow(true)}>
                Tüm Resimleri Kaldır
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
                      Güncelle
                    </button>
                    <button
                      className="updateImage"
                      onClick={() => {
                        setCurrentIndex(index);
                        setConfirmDeleteShow(true);
                        // onImageRemove(index);
                        // setRemoveFlag(true);
                      }}
                    >
                      Kaldır
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
                  Bu resmi silmek istediğinize emin misiniz?
                </div>
                <div className="confirmPopup">
                  <button
                    className="confirmModalButton"
                    type="button"
                    onClick={() => {
                      setConfirmDeleteShow(false);
                    }}
                  >
                    Vazgeç
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
                  Bütün resimleri silmek istediğinize emin misiniz?
                </div>
                <div className="confirmPopup">
                  <button
                    className="confirmModalButton"
                    type="button"
                    onClick={() => {
                      setConfirmDeleteAllShow(false);
                    }}
                  >
                    Vazgeç
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

export default Dashboard;
