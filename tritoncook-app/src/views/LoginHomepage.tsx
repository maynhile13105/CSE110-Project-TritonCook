import LoginForm from "../components/homepage/LoginForm";
import "../css/LoginHomepage.css"

export const LoginHomepage = () => {
    return (
        <div className="container">
            <div className="banner">
                <div className="slogan-container">
                    <h1 className="slogan">Share, Discover, Savor</h1>
                    <h1 className="slogan">with</h1>
                    <h1 className="slogan">TritonCook</h1>
                </div>

                <div className="logo-container">
                    <img src="/images/logo.png" className="logo"></img>
                </div>
            </div>

            <div className="Login-Form">
                <LoginForm />
            </div>
        </div>
    );
}