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
    const [isOpen, setIsOpen] = useState(false); //Boolean for showing the Approve modal if it is just clicked the chekbox
    const [name, setName] = useState(0); //Keeps the entered name
    const [surname, setSurname] = useState(0); //Keeps the entered surnamename
    const [email, setEmail] = useState(0); //Keeps the entered email
    const [phone, setTel] = useState(0); //Keeps the entered phone number
    const [password, setPassword] = useState(0); //Keeps the entered password
    const [kvkk, setKvkk] = useState(0); //Keeps the boolean of the checkbox
    const [kvkkRead, setKvkkRead] = useState(true); //Keeps whether the Approve modal was read or not
    const{fontSize,setFontSize} = useContext(FontSizeContext) //To share the font-size of all of the text between the components and pages
    toast.configure()
    const navigate = useNavigate();
    
    function onCheckBoxClick (e) { //Shows Approve modal if the user clicked the checkbox before reading the Approve modal.
        if(e.target.checked && kvkkRead){
            toggleApprove() //Opens the Approve Modal
        }
    }
    const toggleApprove = () => { //In order to open or close the Approve modal 
      setIsOpen(!isOpen);
      setKvkkRead(false)
    }
    async function submitSignUpForm(name, surname, email, phone, password) { //Function for signing up to the system
        var jsonData = {
          "data": [{
            "name": name,
            "surname": surname,
            "email": email,
            "phone": phone,
            "password": password
          }]
        }
        if(!kvkk){ //If this does not evaluate True, user cannot be signed-up and alert the user.
            toast.warning('Kayıt olabilmeniz için sözleşmeyi onaylamanız gerekmektedir!',
           {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else{
            const a = await signUpAction(jsonData); //API call for signing-up the user.
            if(a==='User added Successfully'){ //If it returns 'User added Successfully', user is signed-up to the system, and alert the user.
                toast.success('Hesap Başarıyla Oluşturuldu',
            {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            navigate("../Login");
            }else if(a==="Lütfen isminizi giriniz!"){ //If it returns "Lütfen isminizi giriniz!", user did not enter his/her name, and alert the user.
                toast.warning('Lütfen isminizi giriniz!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
                
             }else if(a==="Lütfen soyadınızı giriniz!"){ //If it returns "Lütfen soyadınızı giriniz!", user did not enter his/her surname, and alert the user.
                toast.warning('Lütfen soyadınızı giriniz!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            }else if(a==="Lütfen email adresinizi ya da telefon numaranızı giriniz!"){ //If it returns "Lütfen email adresinizi ya da telefon numaranızı giriniz!", user did not enter his/her email or phone number, and alert the user.
                toast.warning('Lütfen email adresinizi ya da telefon numaranızı giriniz!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            }else if(a==="Lütfen bir şifre belirleyiniz!"){ //If it returns "Lütfen bir şifre belirleyiniz!", user did not enter a password, and alert the user.
                toast.warning('Lütfen bir şifre belirleyiniz!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            }else if(a==="Şifreniz en az 8 haneli olmak zorundadır!"){ //If it returns "Şifreniz en az 8 haneli olmak zorundadır!", user did not enter a password with at least 8-character long, and alert the user.
                toast.warning('Şifreniz en az 8 haneli olmak zorundadır!',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            }else if(a==="Telefon numaranız 10 haneli olmak zorundadır!"){ //If it returns "Telefon numaranız 10 haneli olmak zorundadır!", user did not enter his/her phone number in a correct structure, and alert the user.
                toast.warning("Telefon numaranız 10 haneli olmak zorundadır!",
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            }else if(a==="Telefon numaranızı başında 0 olmadan giriniz!"){ //If it returns "Telefon numaranızı başında 0 olmadan giriniz!", user entered his/her phone number with a 0 at the beginning which is not allowed, and alert the user.
                toast.warning("Telefon numaranızı başında 0 olmadan giriniz!",
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
            }else{ //User has an account with this email or phone number, and alert the user.
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
                                <b>Gizlilik</b>
                                <p>Türk toplumunda demans ile ilişkili yaşam tarzı risklerinin belirlenmesi kapsamında yapılan bu çalışmada sizden kayıt esnasında istenen e-posta adresiniz veya bilgilerin asla araştırma amacı dışında kullanılmayacağını belirtmek isteriz. 
Bu web-sitesinde sizin yaşam şeklinize yönelik demans riski oluşturabilecek bazı sorular sorulmaktadır. Bu sorularla ilgili verilen cevaplar yalnızca araştırma amacıyla kullanılacak olup gizliliği ve kişilerin mahremiyeti etik kurallar çerçevesinde sağlanacaktır. 
Kişisel yanıtlarınızdan sonra verilen tavsiyeler profesyonel ve tıbbi tavsiyenin yerine geçmediğini kabul ederek çalışmaya katılmaya onay verdiğinizi kabul etmeniz gerekmektedir. 
</p>
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