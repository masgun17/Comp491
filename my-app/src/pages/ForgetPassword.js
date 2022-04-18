import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link } from "react-router-dom";
import { submitNewPasswordAction } from "../tool/actions";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = ({ ...props }) => {
    const [email, setEmail] = useState(0);
    toast.configure()

    async function submitNewPassword() {
        var jsonData = {
            "data": [{
              "email": email
            }]
          }
        const a = await submitNewPasswordAction(jsonData);
        if(a==='Password Changed'){
            toast.success('Yeni şifreniz mailinize yönlendirilmiştir.',
            {position: toast.POSITION.TOP_CENTER, autoClose:2000})

        }else if(a==='User is not registered'){
            toast.warning('Kullanıcının hesabı bulunamadı',
                {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        }
    
    }

  return (
    <Modal {...props} size="l" centered>
        <div className="createNewSuperAdminPageLayout">
            <div className="createNewSuperAdmingPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1>Şifremi Unuttum</h1>
            </div>
                <form >
                    <div className="innerForm" id="createNewAdminForm" style={{ "align-self": "flex-start" }}>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div >
                </form>
                <button id="newSuperAdminAdd" onClick={() => 
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