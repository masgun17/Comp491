import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link } from "react-router-dom";
import { changePasswordAction, fetchDBAction } from "../tool/actions";
import { UserIdContext} from "../Helper/Context";


const ForgetPassword = ({ ...props }) => {
    const [email, setEmail] = useState(0);
    const [phone, setTel] = useState(0);
    const [password, setPassword] = useState(0);

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
                        <div className="form-group">
                            <label htmlFor="tel">Telefon Numarası: </label>
                            <input type="tel" name="tel" id="tel" placeholder="5*********" pattern="[0-9]{10}" maxLength="10"  onChange={(e) => setTel(e.target.value)}/>
                        </div>
                       {/*  <div className="form-group">
                            <label htmlFor="password">Şifre: </label>
                            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                        </div> */}
                        

                    </div >
                </form>
                <button id="newSuperAdminAdd" 
                        >Şifreyi Sıfırla 
                             </button>
            <Outlet style={{ "grid-row-start": "2" }} />
        </div>
    </Modal>
  );
};

export default ForgetPassword;