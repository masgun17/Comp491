import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import React from 'react';
import Approve from './Approve';

const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  const toggleApprove = () => {
    setIsOpen(!isOpen);
  }
    return (
        // <h1>Disease Information Page</h1>
        <div className="informationPageLayout">
            <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1>Kayıt Ol</h1>
            </div>
            <div className="informationPageDiv2" style={{ "grid-row-start": "2", "font-size": "20px", "line-height": "2" }}>
                <form>
                    <div className="innerForm" style={{ "align-self": "flex-start" }}>
                        <div className="form-group">
                            <label htmlFor="name">Ad: </label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Soyad: </label>
                            <input type="text" name="surname" id="surname" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" id="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tel">Telefon Numarası: </label>
                            <input type="tel" name="tel" id="tel" placeholder="1234567891" pattern="[0-9]{10}" maxLength="10" />

                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Şifre: </label>
                            <input type="password" name="password" id="password" />
                        </div>
                        <div className="form-group">
                            <Link to="/Signup" name="kvkk" id= "kvkk" onClick={toggleApprove} style={{ "color":"red"}}>Okudum, onayladım</Link><input type="checkbox" style={{ "display": "inline", "width": "20px", "height": "20px", "marginLeft": "60px" }} />
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
                        <input type="submit" value="Kayit Ol" name="submit" id="submit" />
                    </div>
                </form>
            </div>
            <Outlet style={{ "grid-row-start": "2" }} />
        </div>
    );
};

export default Signup;