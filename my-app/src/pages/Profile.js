import { Outlet, Link } from "react-router-dom";
import { useState, useContext } from 'react';
import { LoginContext, UserNameContext, UserSurnameContext,UserEmailContext, UserPhoneContext,UserIdContext,UserTypeIdContext} from "../Helper/Context";

function Profile () {
    const{isLogin,setIsLogin} = useContext(LoginContext) 
    const{name,setName} = useContext(UserNameContext) 
    const{surname,setSurname} = useContext(UserSurnameContext) 
    const{emailForProfile,setEmailForProfile} = useContext(UserEmailContext) 
    const{phoneForProfile,setPhoneForProfile} = useContext(UserPhoneContext) 
    const{id,setId} = useContext(UserIdContext) 
    const{userTypeId,setUserTypeId} = useContext(UserTypeIdContext) 



    return (
        <div className="informationPageLayout">
            <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1>Profil</h1>
            </div>
            <div className="informationPageDiv2" style={{ "grid-row-start": "2", "font-size": "20px", "line-height": "2" }}>
                <form className="form">
                    <div className="innerForm" style={{ "align-self": "flex-start" }}>
                    <div className="form-group">
                            <label htmlFor="name">İsim: {name}</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Soyisim: {surname}</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: {emailForProfile}</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tel">Telefon Numarası: {phoneForProfile}</label>
                        </div>
                    </div>
                </form>
            </div>
            <Outlet style={{ "grid-row-start": "2" }} />
        </div>
    );
};

export default Profile;