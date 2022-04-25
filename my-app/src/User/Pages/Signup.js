import { Outlet, Link } from "react-router-dom";
import { useState, useContext } from 'react';
import React from 'react';
import Approve from './Approve';
import { FontSizeContext} from "../../Helper/Context";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signUpAction} from "../../tool/actions";
//import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import "../Styles/User.css";

const Signup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(0);
    const [surname, setSurname] = useState(0);
    const [email, setEmail] = useState(0);
    const [phone, setTel] = useState(0);
    const [password, setPassword] = useState(0);
    const [kvkk, setKvkk] = useState(0);
    const [kvkkRead, setKvkkRead] = useState(true);
    const{fontSize,setFontSize} = useContext(FontSizeContext) 
    toast.configure()
    const navigate = useNavigate();
    
    function onCheckBoxClick (e) {
        if(e.target.checked && kvkkRead){
            toggleApprove()
        }
    }
    const toggleApprove = () => {
      setIsOpen(!isOpen);
      setKvkkRead(false)
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
            toast.warning('Kayıt olabilmeniz için sözleşmeyi onaylamanız gerekmektedir!',
           {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else{
            const a = await signUpAction(jsonData);
            if(a==='User added Successfully'){
                toast.success('Hesap Başarıyla Oluşturuldu',
            {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            navigate("../Login");
            }else if(a==="Lütfen isminizi giriniz!"){
                toast.warning('Lütfen isminizi giriniz!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
                
             }else if(a==="Lütfen soyadınızı giriniz!"){
                toast.warning('Lütfen soyadınızı giriniz!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            }else if(a==="Lütfen email adresinizi ya da telefon numaranızı giriniz!"){
                toast.warning('Lütfen email adresinizi ya da telefon numaranızı giriniz!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            }else if(a==="Lütfen bir şifre belirleyiniz!"){
                toast.warning('Lütfen bir şifre belirleyiniz!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            }else if(a==="Şifreniz en az 8 haneli olmak zorundadır!"){
                toast.warning('Şifreniz en az 8 haneli olmak zorundadır!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            }else if(a==="Telefon numaranız 10 haneli olmak zorundadır!"){
                toast.warning("Telefon numaranız 10 haneli olmak zorundadır!",
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            }else if(a==="Telefon numaranızı başında 0 olmadan giriniz!"){
                toast.warning("Telefon numaranızı başında 0 olmadan giriniz!",
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            }else{
                toast.warning('Kullanıcının hesabı vardır!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            }
        }
      }

    return (
        // <h1>Disease Information Page</h1>
        <div className="LoginLayout">
            <div className="LoginDiv1" style={{ "grid-row-start": "1" }}>
                <h1 style={{"font-size": fontSize*2}}>Kayıt Ol</h1>
            </div>
            <div className="LoginDiv2" style={{ "grid-row-start": "2", "font-size": fontSize, "line-height": "2" }}>
                <form >
                    <div className="innerForm" style={{ "align-self": "flex-start" , "font-size": fontSize}}>
                        <div className="form-group" style={{"font-size": fontSize}}>
                            <label htmlFor="name" style={{"font-size": fontSize}}>Ad: </label>
                            <input class = "form-control" type="text" name="name" id="name" style={{"font-size": fontSize}}  onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group" style={{"font-size": fontSize}}>
                            <label htmlFor="surname" style={{"font-size": fontSize}}>Soyad: </label>
                            <input class = "form-control" type="text" name="surname" id="surname"  style={{"font-size": fontSize}} onChange={(e) => setSurname(e.target.value)}/>
                        </div>
                        <div className="form-group" style={{"font-size": fontSize}}>
                            <label htmlFor="email" style={{"font-size": fontSize}}>Email: </label>
                            <input class = "form-control" type="email" name="email" id="email" style={{"font-size": fontSize}}  onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group" style={{"font-size": fontSize}}>
                            <label htmlFor="tel" style={{"font-size": fontSize}}>Telefon Numarası: </label>
                            <input class = "form-control" type="tel" name="tel" id="tel" placeholder="5*********" pattern="[0-9]{10}" maxLength="10"  style={{"font-size": fontSize}} onChange={(e) => setTel(e.target.value)}/>

                        </div>
                        <div className="form-group"style={{"font-size": fontSize}} >
                            <label htmlFor="password" style={{"font-size": fontSize}}>Şifre: </label>
                            <input class = "form-control" type="password" name="password" id="password" style={{"font-size": fontSize}} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <Link to="/Signup" name="kvkk" id= "kvkk" onClick={toggleApprove} style={{ "color":"red"}}>Okudum, onayladım</Link><input id="kvkkCheckbox" type="checkbox" style={{ "display": "inline", "width": "20px", "height": "20px", "marginLeft": "60px" }} 
                            onClick={(e) => {onCheckBoxClick(e)
                                setKvkk(e.target.checked) 
                                    }} />
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
                        

                    </div >
                </form>
                <button class = "btn btn-primary btn-lg btn-block" style={{"font-size": fontSize}} onClick={() => 
                            {submitSignUpForm(document.getElementById("name").value,document.getElementById("surname").value,document.getElementById("email").value,document.getElementById("tel").value,document.getElementById("password").value);
                            }}
                        >Kayıt Ol
                             </button>
            </div>
            <Outlet style={{ "grid-row-start": "2" }} />
        </div>
    );
};

export default Signup;