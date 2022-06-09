import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { submitNewPasswordAction } from "../../tool/actions";
import "../Styles/User.css";
import { useNavigate } from "react-router-dom";

const ForgetPassword = ({ ...props }) => {
    const [email, setEmail] = useState(0); //Entered user's e-mail to the field
    toast.configure()
    const navigate = useNavigate();

    async function submitNewPassword() { 
        var jsonData = { //request's data
            "data": [{
              "email": email
            }]
          }
        const a = await submitNewPasswordAction(jsonData); //API call to reset password of the user
        if(a==='Password Changed'){ //If returned value of the API call is Password Changed, new password is sent to the entered email adress and alert the user.
            toast.success('Yeni şifreniz mailinize yönlendirilmiştir.',
            {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }else if(a==='User is not registered'){ //If returned value of the API call is User is not registered, user with entered email could not be found and alert the user.
            toast.warning('Kullanıcının hesabı bulunamadı',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }
    
    }

  return (
    <Modal {...props} size="l" centered>
        <div className="UserPageLayout">
            <div className="UserPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1 style={{"marginBottom":"30px"}}>Şifremi Unuttum</h1>
            </div>
                <form >
                    <div className="innerForm" id="createNewAdminForm" style={{ "align-self": "flex-start" }}>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input class = "form-control" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div >
                </form>
                <button class = "btn btn-primary btn-lg btn-block" id="forgetPasswordButton" onClick={() => 
                            {submitNewPassword(document.getElementById("email").value);
                            }}
                        >Şifreyi Sıfırla 
                             </button>
            <Outlet style={{ "grid-row-start": "2" }} />
        </div>
    </Modal>
  );
};

export default ForgetPassword;