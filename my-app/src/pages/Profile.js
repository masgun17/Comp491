import { useState, useContext } from 'react';
import CreateNewAdmin from './CreateNewAdmin';
import CreateNewSuperAdmin from './CreateNewSuperAdmin';
import ChangePassword from './ChangePassword';
import { FontSizeContext} from "../Helper/Context";

const Profile = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);
    const{fontSize,setFontSize} = useContext(FontSizeContext) 

    let userName = sessionStorage.getItem('userName');
    let userSurname = sessionStorage.getItem('userSurname');
    let userEmail = sessionStorage.getItem('userEmail');
    let userPhone = sessionStorage.getItem('userPhone');
    let userTypeId = sessionStorage.getItem('userTypeId');

    return (
        <div className="informationPageLayout">
            <div className="informationPageDiv1" style={{ "grid-row-start": "1", "font-size": fontSize }}>
                <h1 style={{"font-size": fontSize*2}}>Profil</h1>
            </div>
            <div className="informationPageDiv2" style={{ "grid-row-start": "2", "font-size": fontSize, "line-height": "2" }}>
                <form className="form" style={{"font-size": fontSize}}>
                    <div className="innerForm" style={{ "align-self": "flex-start" , "font-size": fontSize }}>
                    <div className="form-group" style={{"font-size": fontSize}}>
                            <label htmlFor="name" style={{"font-size": fontSize}}>İsim: {userName}</label>
                        </div>
                        <div className="form-group" style={{"font-size": fontSize}}>
                            <label htmlFor="surname" style={{"font-size": fontSize}}>Soyisim: {userSurname}</label>
                        </div>
                        <div className="form-group" style={{"font-size": fontSize}}>
                            <label htmlFor="email" style={{"font-size": fontSize}}>Email: {userEmail}</label>
                        </div>
                        <div className="form-group" style={{"font-size": fontSize}}>
                            <label htmlFor="tel" style={{"font-size": fontSize}}>Telefon Numarası: {userPhone}</label>
                        </div>
                    </div>
                </form>
                <button
                  className="changePassword"
                  // Update onClick function such that it will open a modal content structure
                  onClick={() => {
                    setModalShow3(true);
                  }}
                  style={{ "margin-top": "10px" , "font-size": fontSize}}
                >Şifremi Değiştir</button>
                {userTypeId==='3' ? (
                <div>
                <button 
                  className="createNewAdmin"
                  // Update onClick function such that it will open a modal content structure
                  onClick={() => {
                    setModalShow2(true);
                  }}
                  style={{ "margin-top": "10px" , "font-size": fontSize}}
                >Yeni Admin Ekle</button>
                <button
                  className="createNewSuperAdmin"
                  // Update onClick function such that it will open a modal content structure
                  onClick={() => {
                    setModalShow(true);
                  }}
                  style={{ "margin-top": "10px" , "font-size": fontSize}}
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