import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const [storageData, setStorageData] = useState({});
    const navigate = useNavigate()
    useEffect(() => {
        let retriveId = localStorage.getItem("loginId")
        retriveId = JSON.parse(retriveId)
        setStorageData({ ...retriveId })
    }, []);
    const logout = () => {
        localStorage.removeItem("loginId");
        navigate("/")
    }
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={"/home"}>Create</Link>
                    </li>
                    <li>
                        <Link to={"/alldata"}>Employee List</Link>
                    </li>
                    <li>
                        <span style={{ color: "white" }}>Welcome: {storageData.user}</span>
                    </li>
                    <li>
                        <button onClick={logout}>Logout</button>
                    </li>
                    <li></li>
                    <li></li>
                </ul>
            </nav>
        </>
    )
}