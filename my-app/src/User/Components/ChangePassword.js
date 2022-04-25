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
    const [password, setPassword] = useState(0);
    const [passwordNew, setPasswordNew] = useState(0);
    const [passwordNewAgain, setPasswordNewAgain] = useState(0);
    toast.configure()
    const navigate = useNavigate();

    async function changePassword(password,passwordNew, passwordNewAgain) {
        if(passwordNew!==passwordNewAgain){
            toast.warning('Yeni şifre ile yeni şifre tekrarın aynı olması gerekiyor!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(passwordNew.length<8){
            toast.warning('Yeni Şifreniz en az 8 haneli olmak zorundadır!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(password==null){
            toast.warning('Güncel Şifrenizi Giriniz',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else{
            var jsonData = {
                "data": [{
                  "id": sessionStorage.getItem('userId'),
                  "password": password,
                  "passwordNew": passwordNew,
                  "passwordNewAgain": passwordNewAgain
                }]
              }
              const a = await changePasswordAction(jsonData);
              if(a==='Password Changed'){
                  //alert('Şifre Başarıyla Değiştirildi')
                  toast.success('Şifre Başarıyla Değiştirildi',
                    {position: toast.POSITION.TOP_CENTER, autoClose:2000})
                  setPassword("")
                  setPasswordNew("")
                  setPasswordNewAgain("")
                  navigate("/");


                }else if(a==="Current Password is not correct"){
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