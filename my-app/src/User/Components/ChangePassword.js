import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { changePasswordAction } from "../../tool/actions";
import "../Styles/User.css";


const ChangePassword = ({ ...props }) => {
    const [password, setPassword] = useState(0); //Keeping old password
    const [passwordNew, setPasswordNew] = useState(0); //Keeping new password
    const [passwordNewAgain, setPasswordNewAgain] = useState(0); //Keeping new password value again
    toast.configure()
    const navigate = useNavigate();

    async function changePassword(password,passwordNew, passwordNewAgain) {
        if(passwordNew!==passwordNewAgain){ //If new password and new password again are not equal, return alert
            toast.warning('Yeni şifre ile yeni şifre tekrarın aynı olması gerekiyor!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(passwordNew.length<8){ //If the new password's length is shorter than 8, return alert
            toast.warning('Yeni Şifreniz en az 8 haneli olmak zorundadır!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(password==null){ //If the user did not enter a new password, return alert.
            toast.warning('Güncel Şifrenizi Giriniz',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else{ //If everything okay, send call to backend.
            var jsonData = { //request's data structure.
                "data": [{
                  "id": sessionStorage.getItem('userId'), //User's id to get and update the password column in the database
                  "password": password, //Old password
                  "passwordNew": passwordNew, //New password
                  "passwordNewAgain": passwordNewAgain //New password again
                }]
              }
              const a = await changePasswordAction(jsonData); //API call for change password
              if(a==='Password Changed'){ //If returned value of the API call is Password Changed, password is changed in the database as well and alert the user.
                  toast.success('Şifre Başarıyla Değiştirildi',
                    {position: toast.POSITION.TOP_CENTER, autoClose:2000})
                  setPassword("")
                  setPasswordNew("")
                  setPasswordNewAgain("")
                  navigate("/");


                }else if(a==="Current Password is not correct"){ //If returned value of the API call is Current Password is not correct, password couldn't changed in the database and alert the user.
                    //alert('Güncel Şifrenizi Hatalı Girdiniz')
                    toast.warning('Güncel Şifrenizi Hatalı Girdiniz',
                    {position: toast.POSITION.TOP_CENTER, autoClose:2000})
                }
    }
    }

  return (
    <Modal {...props} size="l" centered>
        <div className="UserPageLayout">
        <div className="UserPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1 style={{"marginBottom":"30px"}}>Şifre Değiştirme</h1>
            </div>
                <form >
                    <div className="innerForm" id="changePasswordForm" style={{ "align-self": "flex-start" }}>
                        <div className="form-group">
                            <label htmlFor="password">Güncel Şifre: </label>
                            <input class = "form-control" type="password" name="password" id="passwordOld"  onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Yeni Şifre: </label>
                            <input class = "form-control" type="password" name="password" id="passwordNew"  onChange={(e) => setPasswordNew(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Yeni Şifre Tekrar: </label>
                            <input class = "form-control" type="password" name="password" id="passwordNewAgain"  onChange={(e) => setPasswordNewAgain(e.target.value)}/>
                        </div>
                        

                    </div >
                </form>
                <button id="changePasswordButton" class = "btn btn-primary btn-lg btn-block" onClick={() => 
                            {changePassword(document.getElementById("passwordOld").value,document.getElementById("passwordNew").value,document.getElementById("passwordNewAgain").value);
                            }}
                        >Şifremi Değiştir 
                             </button>
            <Outlet style={{ "grid-row-start": "2" }} />
        </div>
    </Modal>
  );
};

export default ChangePassword;