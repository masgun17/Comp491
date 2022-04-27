import React, { useState,useEffect, useContext } from "react";
import { FontSizeContext} from "../../Helper/Context";
//import { IconButton, Colors } from 'react-native-paper';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Icon from '@mui/material/Icon';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import "../Styles/Dashboard.css";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import { saveImageAction, getImagesAction, updateImageAction, deleteImageAction, removeAllImagesAction } from "../../tool/actions"
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const{fontSize,setFontSize} = useContext(FontSizeContext) 
  const [font, setFont] = useState(20);
  const [images, setImages] = React.useState([]);
  const maxNumber = 3;
  const [removeFlag, setRemoveFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);

  let userTypeId = sessionStorage.getItem('userTypeId') 

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    /*getAllImages()*/
    /* console.log(imageList, addUpdateIndex);*/
    console.log(imageList) 
    setImages(imageList);
  };

  const getImages = async () => {
    let result = await getImagesAction();
    console.log(result)
    setImages(result);
  };

  useEffect(async () => {
    await getImages();
  }, []);

  useEffect(async () => {
    if(removeFlag){
      if(images!==null ){
        await removeImage();
      }
    }
    
  }, [images]);

  useEffect(async () => {
    if(updateFlag){
      if(images!==null ){
        await updateImage();
      }
    }
    
  }, [images]);

  async function saveImage(image,index) {
    console.log(image.file.name);
    console.log(index);
    console.log(image.data_url);

    var jsonData = {
      "data": [{
        "data_url": image.data_url,
        "index": index,
      }]
    }

    const a = await saveImageAction(jsonData);
    await getImages();
    
  }

  async function updateImage(){
    for (let index = 0; index < 3; index++) {
      
      if(images[index]){
        console.log(images)
        const image = images[index];
        var jsonData = {
          "data": [{
            "Img_base64": image.data_url,
            "Index": index,
          }]
          }
            const a = await updateImageAction(jsonData);
      }
    }
    setUpdateFlag(false);

  }

  async function removeImage() {
    for (let index = 0; index < 3; index++) {
      
      if(images[index]){
        const image = images[index];
        var jsonData = {
          "data": [{
            "Img_base64": image.data_url,
            "Index": index,
          }]
          }
            const a = await updateImageAction(jsonData);
      }else{
        var jsonData = {
          "data": [{
            "Index": index,
          }]
          }
        const a = await deleteImageAction(jsonData);
        console.log(index);

      }
    }
    setRemoveFlag(false);
    console.log(images)
  }

  async function onImageRemoveAllButton() {
  
    const a = await removeAllImagesAction();
    window.location.reload(false);

  }
  


    
    
    
  return (
    // <h1>Dashboard</h1>;
    <div className="wrapper">
      <div className="leftPhotos">
      <div className="image-item">
          <iframe className="photoLeft" type="text/html" width="" height=""
              src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
              frameborder="0"></iframe> 
      </div>
      <div className="image-item">
            <iframe className="photoLeft" type="text/html" width="" height=""
              src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
              frameborder="0"></iframe>       </div>
      <div className="image-item">
            <iframe className="photoLeft" type="text/html" width="" height=""
              src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
              frameborder="0"></iframe>       </div>
      
      </div>   
      
      <div className="dashboardLayout" style={{"font-size": fontSize}}>
          <div className="dashboardDiv1" style={{"grid-row-start": "1"}}>
            <h1 style={{"font-size": fontSize*2, "color":"#5A6168"}}>Anasayfa</h1>
        </div>
        <div className="dashboardDiv2" style={{"grid-row-start": "2"}}>
            Test Hakkında
        </div>
        <div className="dashboardDiv3" style={{"grid-row-start": "3"}}>
            Neden böyle bir test yapma ihtiyacı duyduk?
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
            {userTypeId==='3' ? (

            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
             ):(
              null
            )}
            &nbsp;
            {userTypeId==='3' ? (
            <button onClick={onImageRemoveAllButton}>Remove all images</button>
            ):(
              null
            )}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img className="photo" src={image.data_url} alt="" width="" />
                {userTypeId==='3' ? (

                <div className="image-item__btn-wrapper">
                  <button className="updateImage" onClick={() =>  {onImageUpdate(index); setUpdateFlag(true)}}>Update</button>
                  <button className="updateImage" onClick={() => {onImageRemove(index); setRemoveFlag(true)}}>Remove</button>
                  <button onClick={() => saveImage(image,index)}>Save</button>

                </div>
                ):(
                  null
                )}
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      {/* <div className="photoLayout">
        <div className="firstPhotoBox">
            <img className="firstPhoto" src="https://www.researchgate.net/profile/Zaved-Khan/publication/273768877/figure/fig2/AS:294759198412805@1447287477961/Brain-Atrophy-in-Advanced-Alzheimers-Disease-41.png" />
        </div>
        <div className="secondPhotoBox">
            <img className="secondPhoto" src="https://www.researchgate.net/profile/Zaved-Khan/publication/273768877/figure/fig2/AS:294759198412805@1447287477961/Brain-Atrophy-in-Advanced-Alzheimers-Disease-41.png" />
        </div>
        <div className="thirdPhotoBox">
            <img className="thirdPhoto" src="https://www.researchgate.net/profile/Zaved-Khan/publication/273768877/figure/fig2/AS:294759198412805@1447287477961/Brain-Atrophy-in-Advanced-Alzheimers-Disease-41.png" />
        </div>
      </div> */}
    </div>
     
  );
};

export default Dashboard;
