import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link } from "react-router-dom";
import { submitNewPasswordAction } from "../tool/actions";

const ForgetPassword = ({ ...props }) => {
    const [email, setEmail] = useState(0);

    async function submitNewPassword() {
        var jsonData = {
            "data": [{
              "email": email
            }]
          }
        const a = await submitNewPasswordAction(jsonData);
        if(a==='Password Changed'){
            alert('Yeni şifreniz mailinize yönlendirilmiştir.')
            window.location.reload(false);
        }else if(a==='User is not registered'){
            alert("Kullanıcının hesabı bulunamadı")
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