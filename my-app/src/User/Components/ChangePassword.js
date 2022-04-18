import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import { changePasswordAction } from "../../tool/actions";
import "../Styles/User.css";


const ChangePassword = ({ ...props }) => {
    const [password, setPassword] = useState(0);
    const [passwordNew, setPasswordNew] = useState(0);
    const [passwordNewAgain, setPasswordNewAgain] = useState(0);

    async function changePassword(password,passwordNew, passwordNewAgain) {
        if(passwordNew!==passwordNewAgain){
            alert("Yeni şifre ile yeni şifre tekrarın aynı olması gerekiyor")
        }else if(passwordNew.length<8){
            alert("Yeni Şifreniz en az 8 haneli olmak zorundadır! ")
        }else if(password==null){
            alert("Güncel Şifrenizi Giriniz")
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
                  alert('Şifre Başarıyla Değiştirildi')
                  setPassword("")
                  setPasswordNew("")
                  setPasswordNewAgain("")

                }else if(a==="Current Password is not correct"){
                    alert('Güncel Şifrenizi Hatalı Girdiniz')
                }
    }
    }

  return (
    <Modal {...props} size="l" centered>
        <div className="UserPageLayout">
        <div className="UserPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1>Şifre Değiştirme</h1>
            </div>
                <form >
                    <div className="innerForm" id="createNewAdminForm" style={{ "align-self": "flex-start" }}>
                        <div className="form-group">
                            <label htmlFor="password">Güncel Şifre: </label>
                            <input type="password" name="password" id="passwordOld"  onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Yeni Şifre: </label>
                            <input type="password" name="password" id="passwordNew"  onChange={(e) => setPasswordNew(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Yeni Şifre Tekrar: </label>
                            <input type="password" name="password" id="passwordNewAgain"  onChange={(e) => setPasswordNewAgain(e.target.value)}/>
                        </div>
                        

                    </div >
                </form>
                <button id="newSuperAdminAdd" onClick={() => 
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