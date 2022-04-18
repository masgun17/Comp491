import { Outlet, Link } from "react-router-dom";
import { loginAction } from "../tool/actions";
import { useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import ForgetPassword from './ForgetPassword';
import { FontSizeContext} from "../Helper/Context";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login () {
    const navigate = useNavigate();
    const [email, setEmail] = useState(0);
    const [phone, setTel] = useState(0);
    const [password, setPassword] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const{fontSize,setFontSize} = useContext(FontSizeContext) 
    toast.configure()

    async function submitLoginForm(email, phone, password) {
        var jsonData = {
          "data": [{
            "email": email,
            "phone": phone,
            "password": password
          }]
        }
        const a = await loginAction(jsonData);
        if(a["Login"]){
            sessionStorage.setItem('isLogin', 'true')
            sessionStorage.setItem('userName', a["Name"])
            sessionStorage.setItem('userSurname', a["Surname"])
            sessionStorage.setItem('userEmail', a["Email"])
            sessionStorage.setItem('userPhone', a["Phone"])
            sessionStorage.setItem('userId', a["Id"])
            sessionStorage.setItem('userTypeId',a["UserTypeId"])
            navigate("/");
            window.location.reload(false);
        }else if(a==='This account is not in the database'){
            toast.info('Lütfen önce Kayıt Olunuz!',
           {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==='Login unsuccessful'){
            toast.error('Şifre Hatalı!',
           {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Email ya da telefon numaranızı giriniz!"){
            toast.warning('Email ya da telefon numaranızı giriniz!',
           {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Lütfen Şifrenizi Giriniz!"){
            toast.warning('Lütfen Şifrenizi Giriniz!',
           {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else{
            toast.error('Giriş Hatalı!',
           {position: toast.POSITION.TOP_CENTER, autoClose:2000})

        }
        console.log(a);
      }


    return (
        <div className="informationPageLayout" >
            <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1 style={{"font-size": fontSize*2}}>Giriş Yap</h1>
            </div>
            <div className="informationPageDiv2" style={{ "grid-row-start": "2", "font-size": fontSize, "line-height": "2" }}>
                <form className="form" style={{"justify-content": "center", "font-size": fontSize}}>
                    <div className="innerForm" style={{ "align-self": "flex-start", "font-size": fontSize }}>
                        <div className="form-group" style={{"font-size": fontSize}} >
                            <label htmlFor="email" style={{"font-size": fontSize}}>Email: </label>
                            <input type="email" name="email" id="email" style={{"font-size": fontSize}} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group" style={{"font-size": fontSize}}>
                            <label htmlFor="tel" style={{"font-size": fontSize}}>Telefon Numarası: </label>
                            <input type="tel" name="tel" id="tel" placeholder="5*********" pattern="[0-9]{10}" maxLength="10" style={{"font-size": fontSize}} onChange={(e) => setTel(e.target.value)}/>

                        </div>
                        <div className="form-group" style={{"font-size": fontSize}}>
                            <label htmlFor="password" style={{"font-size": fontSize}}>Şifre: </label>
                            <input type="password" name="password" id="password" style={{"font-size": fontSize}} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div style={{ "justify-content": "center","text-align":"center"}}>
                        <Link to="/Login" style={{ "color": "red", "text-align":"center",  "position" : "center"}} 
                        onClick={() => {
                            setModalShow(true);
                          }}> Şifremi Unuttum</Link>
                        </div>
                        <label htmlFor="text">Hesabınız Yoksa:</label><Link to="/Signup" style={{ "color": "red" }}>   Kayıt Olun</Link>
                    </div>
                </form>
                <ForgetPassword
             show={modalShow}
             onHide={() => {
             setModalShow(false);
             }}
           />
                <button style={{"font-size": fontSize}} onClick={() => 
                            {submitLoginForm(document.getElementById("email").value,document.getElementById("tel").value,document.getElementById("password").value);
                            }}
                        >Giriş Yap
                             </button>
            </div>
            <Outlet style={{ "grid-row-start": "2" }} />
        </div>
    );
};

export default Login;