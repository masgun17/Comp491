import React, { useState, useEffect, useContext } from "react";
import { FontSizeContext } from "../../Helper/Context";
//import { IconButton, Colors } from 'react-native-paper';
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Icon from "@mui/material/Icon";
import ZoomIn from "@material-ui/icons/ZoomIn";
import ZoomOut from "@material-ui/icons/ZoomOut";
import "../Styles/Dashboard.css";
import ReactDOM from "react-dom";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { fontSize, setFontSize } = useContext(FontSizeContext);
  const [font, setFont] = useState(20);
  const [images, setImages] = React.useState([]);
  const [tempImages, setTempImages] = useState([]);
  const [video1, setVideo1] = React.useState([]);
  const [video2, setVideo2] = React.useState([]);
  const maxNumber = 2;
  const [removeFlag, setRemoveFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [confirmDeleteShow, setConfirmDeleteShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();

  let userTypeId = sessionStorage.getItem("userTypeId");

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const getImages = async () => {
    let result = await getImagesAction();
    setImages(result);
  };

  const getVideos = async () => {
    var jsonData1 = {
      data: [
        {
          ind: 1,
          page: "d",
        },
      ],
    };
    let video1 = await getVideosAction(jsonData1);

    setVideo1(video1[0]["data_url"]);
    var jsonData2 = {
      data: [
        {
          ind: 2,
          page: "d",
        },
      ],
    };
    let video2 = await getVideosAction(jsonData2);
    setVideo2(video2[0]["data_url"]);
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
      data: [
        {
          data_url: image.data_url,
          index: index,
        },
      ],
    };

    const a = await saveImageAction(jsonData);
    await getImages();
  }

  async function updateImage() {
    for (let index = 0; index < 2; index++) {
      if (images[index]) {
        const image = images[index];
        var jsonData = {
          data: [
            {
              Img_base64: image.data_url,
              Index: index,
            },
          ],
        };
        const a = await updateImageAction(jsonData);
      }
    }
    setUpdateFlag(false);
  }

  function restoreImage() {
    setImages(tempImages);
  }

  async function removeImage() {
    for (let index = 0; index < 3; index++) {
      if (images[index]) {
        const image = images[index];
        var jsonData = {
          data: [
            {
              Img_base64: image.data_url,
              Index: index,
            },
          ],
        };
        const a = await updateImageAction(jsonData);
      } else {
        var jsonData = {
          data: [
            {
              Index: index,
            },
          ],
        };
        const a = await deleteImageAction(jsonData);
      }
    }
    setRemoveFlag(false);
  }

  async function onImageRemoveAllButton() {
    const a = await removeAllImagesAction();
    window.location.reload(false);
  }

  async function saveVideo1(video1) {
    var jsonData = {
      data: [
        {
          video: video1,
          ind: 1,
          page: "d",
        },
      ],
    };

    const a = await saveVideoAction(jsonData);
    window.location.reload(false);
  }

  async function saveVideo2(video2) {
    var jsonData = {
      data: [
        {
          video: video2,
          ind: 2,
          page: "d",
        },
      ],
    };
    const a = await saveVideoAction(jsonData);
    window.location.reload(false);
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
              <button onClick={onImageRemoveAllButton}>
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
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default Dashboard;
