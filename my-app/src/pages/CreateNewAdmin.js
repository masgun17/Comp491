import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import { createNewAdminAction } from "../tool/actions";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewAdmin = ({ ...props }) => {
    const [name, setName] = useState(0);
    const [surname, setSurname] = useState(0);
    const [email, setEmail] = useState(0);
    const [phone, setTel] = useState(0);
    const [password, setPassword] = useState(0);
    toast.configure()

    async function createNewAdminButton(name, surname, email, phone, password) {
        var jsonData = {
          "data": [{
            "name": name,
            "surname": surname,
            "email": email,
            "phone": phone,
            "password": password
          }]
        }
        
        const a = await createNewAdminAction(jsonData);
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
            alert('Kullanıcının hesabı vardır!')
        }
      }

  return (
    <Modal {...props} size="xl" centered>
        <div className="createNewSuperAdminPageLayout">
        <div className="createNewSuperAdmingPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1>Yeni Admin Ekleme</h1>
            </div>
                <form >
                    <div className="innerForm" id="createNewAdminForm" style={{ "align-self": "flex-start" }}>
                        <div className="form-group">
                            <label htmlFor="name">Ad: </label>
                            <input type="text" name="name" id="name"  onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Soyad: </label>
                            <input type="text" name="surname" id="surname"  onChange={(e) => setSurname(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" id="email"  onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tel">Telefon Numarası: </label>
                            <input type="tel" name="tel" id="tel" placeholder="5*********" pattern="[0-9]{10}" maxLength="10"  onChange={(e) => setTel(e.target.value)}/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Şifre: </label>
                            <input type="password" name="password" id="password"  onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        

                    </div >
                </form>
                <button id="newSuperAdminAdd"  onClick={() => 
                            {createNewAdminButton(document.getElementById("name").value,document.getElementById("surname").value,document.getElementById("email").value,document.getElementById("tel").value,document.getElementById("password").value);
                            }}
                        >Yeni Admin Ekle 
                             </button>
            <Outlet style={{ "grid-row-start": "2" }} />
        </div>
    </Modal>
  );
};

export default CreateNewAdmin;