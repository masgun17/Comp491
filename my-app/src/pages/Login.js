import { Outlet, Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="informationPageLayout">
            <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1>Giriþ Yap</h1>
            </div>
            <div className="informationPageDiv2" style={{ "grid-row-start": "2", "font-size": "20px", "line-height": "2" }}>
                <form>
                    <div className="innerForm" style={{ "align-self": "flex-start" }}>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" id="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tel">Telefon Numarasý: </label>
                            <input type="tel" name="tel" id="tel" placeholder="123-456-78-91" pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}" maxLength="10" />

                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Sifre: </label>
                            <input type="password" name="password" id="password" />
                        </div>
                        <label htmlFor="text">Hesabýnýz Yoksa:</label><Link to="/Signup" style={{ "color": "red" }}>   Kayýt Olun</Link>


                        <input type="submit" value="Giriþ Yap" name="submit" id="submit" />
                    </div>
                </form>
            </div>
            <Outlet style={{ "grid-row-start": "2" }} />
        </div>
    );
};

export default Login;