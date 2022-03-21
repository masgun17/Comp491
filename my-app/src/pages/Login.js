import { Outlet, Link } from "react-router-dom";


const Login = () => {
    return (
        <div className="informationPageLayout">
            <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1>Giriş Yap</h1>
            </div>
            <div className="informationPageDiv2" style={{ "grid-row-start": "2", "font-size": "20px", "line-height": "2" }}>
                <form className="form">
                    <div className="innerForm" style={{ "align-self": "flex-start" }}>
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
                        <label htmlFor="text">Hesabınız Yoksa:</label><Link to="/Signup" style={{ "color": "red" }}>   Kayıt Olun</Link>


                        <input type="submit" value="Giriş Yap" name="submit" id="submit" />
                    </div>
                </form>
            </div>
            <Outlet style={{ "grid-row-start": "2" }} />
        </div>
    );
};

export default Login;