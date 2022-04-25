import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createNewSuperAdminAction } from "../../tool/actions"
import "../Styles/User.css";

const CreateNewSuperAdmin = ({ ...props }) => {
    const [name, setName] = useState(0);
    const [surname, setSurname] = useState(0);
    const [email, setEmail] = useState(0);
    const [phone, setTel] = useState(0);
    const [password, setPassword] = useState(0);
    toast.configure()

    async function createNewSuperAdminButton(name, surname, email, phone, password) {
        var jsonData = {
          "data": [{
            "name": name,
            "surname": surname,
            "email": email,
            "phone": phone,
            "password": password
          }]
        }
        
        const a = await createNewSuperAdminAction(jsonData);
        if(a==='User added Successfully'){
            toast.success('Hesap Başarıyla Oluşturuldu',
            {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Lütfen isminizi giriniz!"){
            toast.warning('Lütfen isim giriniz!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Lütfen soyadınızı giriniz!"){
            toast.warning('Lütfen soyad giriniz!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Lütfen email adresinizi ya da telefon numaranızı giriniz!"){
            toast.warning('Email ya da telefon numarası giriniz!',
            {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Lütfen bir şifre belirleyiniz!"){
            toast.warning('Lütfen bir şifre belirleyiniz!',
            {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Şifreniz en az 8 haneli olmak zorundadır!"){
            toast.warning('Şifre en az 8 haneli olmak zorundadır!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else{
            toast.warning('Kullanıcının hesabı vardır!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }
      }

  return (
    <Modal {...props} size="xl" centered>
        <div className="UserPageLayout">
        <div className="UserPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1 style={{"marginBottom":"30px"}}>Yeni Super Admin Ekleme</h1>
            </div>
                <form >
                    <div className="innerForm" id="createNewAdminForm" style={{ "align-self": "flex-start" }}>
                        <div className="form-group">
                            <label htmlFor="name">Ad: </label>
                            <input class = "form-control" type="text" name="name" id="name"  onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Soyad: </label>
                            <input class = "form-control" type="text" name="surname" id="surname"  onChange={(e) => setSurname(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input class = "form-control" type="email" name="email" id="email"  onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tel">Telefon Numarası: </label>
                            <input class = "form-control" type="tel" name="tel" id="tel" placeholder="5*********" pattern="[0-9]{10}" maxLength="10"  onChange={(e) => setTel(e.target.value)}/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Şifre: </label>
                            <input class = "form-control" type="password" name="password" id="password"  onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                     

                    </div >
                </form>
                <button class = "btn btn-primary btn-lg btn-block" id="createNewSuperAdminButton" onClick={() => 
                            {createNewSuperAdminButton(document.getElementById("name").value,document.getElementById("surname").value,document.getElementById("email").value,document.getElementById("tel").value,document.getElementById("password").value);
                            }}
                        >Yeni SuperAdmin Ekle 
                             </button>
            <Outlet style={{ "grid-row-start": "2" }} />
        </div>
    </Modal>
  );
};

export default CreateNewSuperAdmin;