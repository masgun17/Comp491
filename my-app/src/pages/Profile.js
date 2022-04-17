import { useState } from 'react';
import CreateNewAdmin from './CreateNewAdmin';
import CreateNewSuperAdmin from './CreateNewSuperAdmin';
import ChangePassword from './ChangePassword';

const Profile = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);

    let userName = sessionStorage.getItem('userName');
    let userSurname = sessionStorage.getItem('userSurname');
    let userEmail = sessionStorage.getItem('userEmail');
    let userPhone = sessionStorage.getItem('userPhone');
    let userTypeId = sessionStorage.getItem('userTypeId');

    return (
        <div className="informationPageLayout">
            <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1>Profil</h1>
            </div>
            <div className="informationPageDiv2" style={{ "grid-row-start": "2", "font-size": "20px", "line-height": "2" }}>
                <form className="form">
                    <div className="innerForm" style={{ "align-self": "flex-start" }}>
                    <div className="form-group">
                            <label htmlFor="name">İsim: {userName}</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Soyisim: {userSurname}</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: {userEmail}</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tel">Telefon Numarası: {userPhone}</label>
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
                {userTypeId==='3' ? (
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