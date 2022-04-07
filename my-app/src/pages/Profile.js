import { Outlet, Link } from "react-router-dom";
import { useState, useContext } from 'react';
import { LoginContext, UserNameContext, UserSurnameContext,UserEmailContext, UserPhoneContext,UserIdContext,UserTypeIdContext} from "../Helper/Context";
import Approve from './Approve';
import CreateNewAdmin from './CreateNewAdmin';
import CreateNewSuperAdmin from './CreateNewSuperAdmin';
import ChangePassword from './ChangePassword';

const Profile = () => {
    const{isLogin,setIsLogin} = useContext(LoginContext) 
    const{name,setName} = useContext(UserNameContext) 
    const{surname,setSurname} = useContext(UserSurnameContext) 
    const{emailForProfile,setEmailForProfile} = useContext(UserEmailContext) 
    const{phoneForProfile,setPhoneForProfile} = useContext(UserPhoneContext) 
    const{id,setId} = useContext(UserIdContext) 
    const{userTypeId,setUserTypeId} = useContext(UserTypeIdContext) 
    const [isOpen, setIsOpen] = useState(false);
    const [kvkk, setKvkk] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);
    const [modalShow2, setModalShow2] = useState(false);
    const handleModalClose2 = () => setModalShow2(false);
    const handleModalShow2 = () => setModalShow2(true);
    const [modalShow3, setModalShow3] = useState(false);
    const handleModalClose3 = () => setModalShow3(false);
    const handleModalShow3 = () => setModalShow3(true);
    const [isCreateNewSuperAdminOpen, setIsCreateNewSuperAdminOpen] = useState(false);

    const toggleApprove = () => {
        setIsOpen(!isOpen);
      }

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
                <button
                  className="changePassword"
                  // Update onClick function such that it will open a modal content structure
                  onClick={() => {
                    setModalShow3(true);
                  }}
                  style={{ "margin-top": "10px" }}
                >Şifremi Değiştir</button>
                {userTypeId=='3' ? (
                <div>
                <button
                  className="createNewAdmin"
                  // Update onClick function such that it will open a modal content structure
                  onClick={() => {
                    setModalShow2(true);
                  }}
                  style={{ "margin-top": "10px" }}
                >Yeni Admin Ekle</button>
                <button
                  className="createNewSuperAdmin"
                  // Update onClick function such that it will open a modal content structure
                  onClick={() => {
                    setModalShow(true);
                  }}
                  style={{ "margin-top": "10px" }}
                >
                Yeni Süper Admin Ekle</button>
                </div>
                ):(
                  null
                )}
            </div>
            <div>
            <div>
           <ChangePassword
             show={modalShow3}
             onHide={() => {
             setModalShow3(false);
             }}
           />
           </div>
              <div>
            
            <CreateNewAdmin
              show={modalShow2}
              onHide={() => {
              setModalShow2(false);
              }}
            />
            </div>
            
            <div>
           
            <CreateNewSuperAdmin
              show={modalShow}
              onHide={() => {
              setModalShow(false);
              }}
            />
            </div>
            </div>
            
        </div>
        
    );
};

export default Profile;