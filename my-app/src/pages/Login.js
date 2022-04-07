import { Outlet, Link } from "react-router-dom";
import { loginAction, fetchDBAction } from "../tool/actions";
import { useState, useContext } from 'react';
import { LoginContext, UserNameContext, UserSurnameContext,UserEmailContext, UserPhoneContext,UserIdContext,UserTypeIdContext} from "../Helper/Context";
import { useNavigate } from "react-router-dom";
import ForgetPassword from './ForgetPassword';

function Login () {
    const navigate = useNavigate();
    const{isLogin,setIsLogin} = useContext(LoginContext) 
    const{name,setName} = useContext(UserNameContext) 
    const{surname,setSurname} = useContext(UserSurnameContext) 
    const{emailForProfile,setEmailForProfile} = useContext(UserEmailContext) 
    const{phoneForProfile,setPhoneForProfile} = useContext(UserPhoneContext) 
    const{id,setId} = useContext(UserIdContext) 
    const{userTypeId,setUserTypeId} = useContext(UserTypeIdContext) 
    const [email, setEmail] = useState(0);
    const [phone, setTel] = useState(0);
    const [password, setPassword] = useState(0);
    const [modalShow, setModalShow] = useState(false);

    async function submitLoginForm(email, phone, password) {
        console.log("Helllooo")
        var jsonData = {
          "data": [{
            "email": email,
            "phone": phone,
            "password": password
          }]
        }
        const a = await loginAction(jsonData);
        if(a["Login"]){
            setIsLogin(true)
            navigate("/");
            setName(a["Name"])
            setEmailForProfile(a["Email"])
            setSurname(a["Surname"])
            setPhoneForProfile(a["Phone"])
            setId(a["Id"])
            setUserTypeId(a["UserTypeId"])
        }else if(a=='This account is not in the database'){
            alert('Lütfen önce Kayıt Olunuz!')
        }else if(a=='Login unsuccessful'){
            alert('Şifre Hatalı!')
        }else if(a=="Email ya da telefon numaranızı giriniz!"){
            alert("Email ya da telefon numaranızı giriniz!")
        }else if(a=="Lütfen Şifrenizi Giriniz!"){
            alert("Lütfen Şifrenizi Giriniz!")
        }else{
            alert('Giriş Hatalı!')

        }
        console.log(a);
      }


    return (
        <div className="informationPageLayout">
            <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1>Giriş Yap</h1>
            </div>
            <div className="informationPageDiv2" style={{ "grid-row-start": "2", "font-size": "20px", "line-height": "2" }}>
                <form className="form">
                    <div className="innerForm" style={{ "align-self": "flex-start" }}>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tel">Telefon Numarası: </label>
                            <input type="tel" name="tel" id="tel" placeholder="5*********" pattern="[0-9]{10}" maxLength="10" onChange={(e) => setTel(e.target.value)}/>

                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Şifre: </label>
                            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
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
                <button onClick={() => 
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