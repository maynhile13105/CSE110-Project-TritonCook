import React, {useState, useContext} from "react";

const LoginForm = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div className="LoginForm">
            <form className="UserPassForm">
                <label className="username">Username</label>
                <input
                    required
                    type = "text"
                    id = "username"
                    placeholder="Enter your Username"
                ></input>
                <label className="password">Password</label>
                <input
                    required
                    type = "text"
                    id = "password"
                    placeholder="Enter your Password"
                ></input>
                <button type="submit" id="login">Sign In</button>
            </form>
        </div>
    );


};

export default LoginForm;