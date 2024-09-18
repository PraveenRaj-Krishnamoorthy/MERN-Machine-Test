import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const initialization = {
        username: "",
        password: ""
    }
    const [logindata, setLoginData] = useState(initialization);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...logindata, [name]: value });
    }

    useEffect(() => {
        const loginId = { "user": "myadmin", "password": "mypassword" }
        localStorage.setItem("loginId", JSON.stringify(loginId))
    }, []);

    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault();
        let retriveId = localStorage.getItem("loginId")
        retriveId = JSON.parse(retriveId)
        if (logindata.username === retriveId.user && logindata.password === retriveId.password) {
            alert('Logged in successfully!');
            navigate("/home")
        } else {
            alert(`User: ${retriveId.user}, Password: ${retriveId.password}`)
            setLoginData(initialization)
        }
    }

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <label>Username:</label>
                <input type="text" name='username' value={logindata.username} onChange={handleChange} placeholder="Enter username" className="input-field" />
                <br />
                <label>Password:</label>
                <input type="password" name='password' value={logindata.password} onChange={handleChange} placeholder="Enter password" className="input-field" />
                <br />
                <button className="login-btn">Login</button>
            </form>
        </div>
    );
}