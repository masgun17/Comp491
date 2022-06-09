import { Outlet, Link } from "react-router-dom";
import { useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { FontSizeContext} from "../../Helper/Context";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAction } from "../../tool/actions";
import ForgetPassword from '../Components/ForgetPassword';
import "../Styles/Login.css";
import "../Styles/User.css";

function Login () {
    const navigate = useNavigate();
    const [email, setEmail] = useState(0); //Keeps user's email
    const [phone, setTel] = useState(0); //Keeps user's phone number
    const [password, setPassword] = useState(0); //Keeps user's password
    const [modalShow, setModalShow] = useState(false); //Boolean for showing ForgetPassword modal
    const{fontSize,setFontSize} = useContext(FontSizeContext)  //To share the font-size of all of the text between the components and pages
    toast.configure()

    async function submitLoginForm(email, phone, password) {
        var jsonData = { //request's data
          "data": [{
            "email": email,
            "phone": phone,
            "password": password
          }]
        }
        const a = await loginAction(jsonData); //API call for login to the system
        if(a["Login"]){ //If it returns true, save name, surname, email, phone, id, and type id of the user to the sessionStorage
            sessionStorage.setItem('isLogin', 'true')
            sessionStorage.setItem('userName', a["Name"])
            sessionStorage.setItem('userSurname', a["Surname"])
            sessionStorage.setItem('userEmail', a["Email"])
            sessionStorage.setItem('userPhone', a["Phone"])
            sessionStorage.setItem('userId', a["Id"])
            sessionStorage.setItem('userTypeId',a["UserTypeId"]) //1 is for patients, 2 is for admins, 3 is for super-admins
            navigate("/"); //Navigates to the homepage
            window.location.reload(false);
        }else if(a==='This account is not in the database'){ //If it returns 'This account is not in the database', user is not signup yet, alert the user.
            toast.info('Lütfen önce Kayıt Olunuz!',
           {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==='Login unsuccessful'){ //If it returns 'Login unsuccessful', user entered his/her password wrong, alert the user.
            toast.error('Şifre Hatalı!',
           {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Email ya da telefon numaranızı giriniz!"){ //If it returns "Email ya da telefon numaranızı giriniz!", user did not enter his/her email or phone number, alert the user.
            toast.warning('Email ya da telefon numaranızı giriniz!',
           {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==="Lütfen Şifrenizi Giriniz!"){  //If it returns "Lütfen Şifrenizi Giriniz!", user did not enter a password, alert the user.
            toast.warning('Lütfen Şifrenizi Giriniz!',
           {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else{
            toast.error('Giriş Hatalı!',
           {position: toast.POSITION.TOP_CENTER, autoClose:2000})

        }
      }


    return (
        <div className="LoginLayout">
            <div className="LoginDiv1" style={{ "grid-row-start": "1", "font-size": fontSize }}>
                <h1 style={{"font-size": fontSize*2}}>Giriş Yap</h1>
            </div>
            <div className="LoginDiv2" style={{ "grid-row-start": "2", "font-size": fontSize, "line-height": "2" }}>
                <form className="form">
                    <div className="innerForm" style={{ "align-self": "flex-start", "font-size": fontSize }}>
                        <div className="form-group" style={{"font-size": fontSize}}>
                            <label  htmlFor="email" style={{"font-size": fontSize}}>Email: </label>
                            <input class = "form-control" type="email" name="email" id="email" style={{"font-size": fontSize}} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group" style={{"font-size": fontSize}}>
                            <label htmlFor="tel" style={{"font-size": fontSize}}>Telefon Numarası: </label>
                            <input class = "form-control" type="tel" name="tel" id="tel" placeholder="5*********" pattern="[0-9]{10}" maxLength="10" style={{"font-size": fontSize}} onChange={(e) => setTel(e.target.value)}/>

                        </div>
                        <div className="form-group" style={{"font-size": fontSize}}>
                            <label htmlFor="password" style={{"font-size": fontSize}}>Şifre: </label>
                            <input class = "form-control" type="password" name="password" id="password" style={{"font-size": fontSize}} onChange={(e) => setPassword(e.target.value)}/>
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
                <button class = "btn btn-primary btn-lg btn-block" id="loginButton" style={{"font-size": fontSize}} onClick={() => 
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