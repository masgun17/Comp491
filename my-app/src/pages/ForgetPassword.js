import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link } from "react-router-dom";
import { changePasswordAction, fetchDBAction } from "../tool/actions";
import { UserIdContext} from "../Helper/Context";
import { submitNewPasswordAction } from "../tool/actions";



const ForgetPassword = ({ ...props }) => {
    const [email, setEmail] = useState(0);

    async function submitNewPassword() {
        var jsonData = {
            "data": [{
              "email": email
            }]
          }
        console.log(email)
        const a = await submitNewPasswordAction(jsonData);
        if(a==='Password Changed'){
            alert('Yeni şifreniz mailinize yönlendirilmiştir.')
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