import { Outlet, Link } from "react-router-dom";
const Signup = () => {
    return (
        // <h1>Disease Information Page</h1>
        <div className="informationPageLayout">
            <div className="informationPageDiv1" style={{ "grid-row-start": "1" }}>
                <h1>Kayit Ol</h1>
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
                            <label htmlFor="tel">Telefon Numarasý: </label>
                            <input type="tel" name="tel" id="tel" placeholder="123-456-78-91" pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}" maxLength="10" />

                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Sifre: </label>
                            <input type="password" name="password" id="password" />
                        </div>
                        <div className="form-group">
                            <Link to="/kvkk" style={{ "color": "red" }}>Okudum, onayladým</Link><input type="checkbox" style={{ "display": "inline", "width": "20px", "height": "20px", "marginLeft": "60px" }} />
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