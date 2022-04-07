import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link } from "react-router-dom";
import { createNewAdminAction, fetchDBAction } from "../tool/actions";

const CreateNewAdmin = ({ ...props }) => {
    const [name, setName] = useState(0);
    const [surname, setSurname] = useState(0);
    const [email, setEmail] = useState(0);
    const [phone, setTel] = useState(0);
    const [password, setPassword] = useState(0);

    async function createNewAdminButton(name, surname, email, phone, password) {
        console.log("Helllooo")
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
        if(a=='User added Successfully'){
            alert('Hesap Başarıyla Oluşturuldu')
        }else if(a=="Lütfen isminizi giriniz!"){
            alert("Lütfen isminizi giriniz!")
        }else if(a=="Lütfen soyadınızı giriniz!"){
            alert("Lütfen soyadınızı giriniz!")
        }else if(a=="Lütfen email adresinizi ya da telefon numaranızı giriniz!"){
            alert("Lütfen email adresinizi ya da telefon numaranızı giriniz!")
        }else if(a=="Lütfen bir şifre belirleyiniz!"){
            alert("Lütfen bir şifre belirleyiniz!")
        }else if(a=="Şifreniz en az 8 haneli olmak zorundadır!"){
            alert("Şifreniz en az 8 haneli olmak zorundadır!")
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