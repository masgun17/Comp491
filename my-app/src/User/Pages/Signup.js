import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import React from 'react';
import Approve from './Approve';
import { signUpAction} from "../../tool/actions";
//import { useAlert } from "react-alert";

const Signup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(0);
    const [surname, setSurname] = useState(0);
    const [email, setEmail] = useState(0);
    const [phone, setTel] = useState(0);
    const [password, setPassword] = useState(0);
    const [kvkk, setKvkk] = useState(0);

    const toggleApprove = () => {
      setIsOpen(!isOpen);
    }
    async function submitSignUpForm(name, surname, email, phone, password) {
        var jsonData = {
          "data": [{
            "name": name,
            "surname": surname,
            "email": email,
            "phone": phone,
            "password": password
          }]
        }
        if(!kvkk){
            alert("Kayıt olabilmeniz için sözleşmeyi onaylamanız gerekmektedir!")
        }else{
        const a = await signUpAction(jsonData);
        if(a==='User added Successfully'){
            alert('Hesap Başarıyla Oluşturuldu')
        }else if(a==="Lütfen isminizi giriniz!"){
            alert("Lütfen isminizi giriniz!")
        }else if(a==="Lütfen soyadınızı giriniz!"){
            alert("Lütfen soyadınızı giriniz!")
        }else if(a==="Lütfen email adresinizi ya da telefon numaranızı giriniz!"){
            alert("Lütfen email adresinizi ya da telefon numaranızı giriniz!")
        }else if(a==="Lütfen bir şifre belirleyiniz!"){
            alert("Lütfen bir şifre belirleyiniz!")
        }else if(a==="Şifreniz en az 8 haneli olmak zorundadır!"){
            alert("Şifreniz en az 8 haneli olmak zorundadır!")
        }else{
            alert('Kullanıcının hesabı vardır!')
        }}
      }

    return (
        // <h1>Disease Information Page</h1>
        <div className="informationPageLayout">
            <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1>Kayıt Ol</h1>
            </div>
            <div className="informationPageDiv2" style={{ "grid-row-start": "2", "font-size": "20px", "line-height": "2" }}>
                <form >
                    <div className="innerForm" style={{ "align-self": "flex-start" }}>
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
                        <div className="form-group">
                            <Link to="/Signup" name="kvkk" id= "kvkk" onClick={toggleApprove} style={{ "color":"red"}}>Okudum, onayladım</Link><input id="kvkkCheckbox" type="checkbox" style={{ "display": "inline", "width": "20px", "height": "20px", "marginLeft": "60px" }} onClick={(e) => 
                                setKvkk(e.target.checked)} />
                            {isOpen && <Approve
                                content={<>
                                <b>Sözleşme</b>
                                <p>Disclaimer
c
You may provide consent for us to use your Personal Information and responses for educational and research purposes. 

You further understand and agree that the research tool is not meant, nor intended to be, a substitute for professional, medical, or psychiatric advice and that by accessing the research tool you agree to hold harmless the ANU and the Centre in relation to the responses you provide and the results of the research tool's assessment.</p>
                                </>}
                                handleClose={toggleApprove}
                            />}
                        
                        </div>
                        <button onClick={() => 
                            {submitSignUpForm(document.getElementById("name").value,document.getElementById("surname").value,document.getElementById("email").value,document.getElementById("tel").value,document.getElementById("password").value);
                            }}
                        >Kayıt Ol
                             </button>

                    </div >
                </form>
            </div>
            <Outlet style={{ "grid-row-start": "2" }} />
        </div>
    );
};

export default Signup;