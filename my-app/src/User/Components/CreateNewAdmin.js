import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createNewAdminAction } from "../../tool/actions";
import "../Styles/User.css";

const CreateNewAdmin = ({ ...props }) => {
    const [name, setName] = useState(0); //Keeping new admin's name
    const [surname, setSurname] = useState(0); //Keeping new admin's surname
    const [email, setEmail] = useState(0); //Keeping new admin's email
    const [phone, setTel] = useState(0); //Keeping new admin's phone number
    const [password, setPassword] = useState(0); //Keeping new admin's password
    toast.configure()

    async function createNewAdminButton(name, surname, email, phone, password) { //Creating new admin by super-admin account
        var jsonData = { //Data structure of request's data
          "data": [{
            "name": name,
            "surname": surname,
            "email": email,
            "phone": phone,
            "password": password
          }]
        }
        
        const a = await createNewAdminAction(jsonData); //API call to create an admin account
        if(a==='User added Successfully'){ //If returned value of the API call is User added Successfully, admin user is created alert the user.
            toast.success('Hesap Başarıyla Oluşturuldu',
            {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Lütfen isminizi giriniz!"){ //If returned value of the API call is Lütfen isminizi giriniz!, admin user's name field is empty and alert the user.
            toast.warning('Lütfen isim giriniz!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Lütfen soyadınızı giriniz!"){ //If returned value of the API call is Lütfen soyadınızı giriniz!, admin user's surname field is empty and alert the user.
            toast.warning('Lütfen soyad giriniz!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Lütfen email adresinizi ya da telefon numaranızı giriniz!"){ //If returned value of the API call is Lütfen email adresinizi ya da telefon numaranızı giriniz!, admin user's email or phone number field is empty and alert the user.
            toast.warning('Email ya da telefon numarası giriniz!',
           {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Lütfen bir şifre belirleyiniz!"){ //If returned value of the API call is Lütfen bir şifre belirleyiniz!, admin user's password field is empty and alert the user.
            toast.warning('Lütfen bir şifre belirleyiniz!',
            {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Şifreniz en az 8 haneli olmak zorundadır!"){ //If returned value of the API call is Şifreniz en az 8 haneli olmak zorundadır!, admin user's password's length is less than 8-character and alert the user.
            toast.warning('Şifre en az 8 haneli olmak zorundadır!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else{ //If returned value of the API call is Kullanıcının hesabı vardır!, admin user has an account in the database and alert the user.
            alert('Kullanıcının hesabı vardır!')
        }
      }

  return (
    <Modal {...props} size="xl" centered>
        <div className="UserPageLayout">
        <div className="UserPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1 style={{"marginBottom":"30px"}}>Yeni Admin Ekleme</h1>
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
                <button class = "btn btn-primary btn-lg btn-block" id="createNewAdminButton"  onClick={() => 
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