import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";

export const AllData = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [count, setcount] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const location = useLocation();

    const handleChange = (event) => {
        const { value } = event.target
        setSearchTerm(value)
    }
    useEffect(() => {
        if (searchTerm) {
            const allData = async () => {
                try {
                    await axios.get("http://localhost:8081/api/employees")
                        .then((res) => {
                            const filteredData = res.data.filter((e, i) =>
                                e.user.toLowerCase().startsWith(searchTerm) ||
                                e.email.toLowerCase().startsWith(searchTerm) ||
                                e.date.toString().slice(0, 10).toLowerCase().startsWith(searchTerm)
                            )
                            setAllUsers([...filteredData])
                        }).catch((err) => {
                            console.log(`Error at Catch: ${err}`);
                        }).finally(() => {
                            console.log("get request completed");
                        })
                } catch (error) {
                    console.log(error);
                }
            }
            allData()
        }
    }, [searchTerm, allUsers, location])

    useEffect(() => {
        if (!searchTerm) {
            const allData = async () => {
                try {
                    await axios.get("http://localhost:8081/api/employees")
                        .then((res) => {
                            setAllUsers([...res.data])
                        }).catch((err) => {
                            console.log(`Error at Catch: ${err}`);
                        }).finally(() => {
                            console.log("get request completed");
                        })
                } catch (error) {
                    console.log(error);
                }
            }
            allData()
        }
    }, [searchTerm])
    const deleteIt = async (id, sID) => {
        try {
            await axios.delete(`http://localhost:8081/api/delete/${id}`)
                .then((res) => {
                    console.log("Deleted");
                    setAllUsers((prevState) => (prevState.filter((e, i) => (i !== sID))))
                }).catch((err) => {
                    console.log("Not Deleted");
                }).finally(() => {
                    console.log("delete request completed");
                })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        setcount(allUsers.length);
    }, [allUsers])
    return (
        <>
            <h1 style={{ textAlign: "center", margin: "17px 0px" }}>All Data! Count: {count}</h1>
            <NavBar />
            <div className="input">
                <input type="text" name="" id="" onChange={handleChange} placeholder="search by Date ,name, email.." />
                <div><span>ID</span><span>Name</span><span>Email</span><span>Num</span><span>Position</span><span>Gender</span><span>course</span><span>Date</span><span>Action</span></div>
            </div>
            <div className="div">
                {allUsers && allUsers.map((e, i) => (
                    <div className="data" key={e._id}>
                        <p>{i + 1}</p>
                        <p>{e.user}</p>
                        <p>{e.email}</p>
                        <p>{e.num}</p>
                        <p>{e.designation}</p>
                        <p>{e.gender}</p>
                        <p>{e.course}</p>
                        <p>{e.date.toString().slice(0, 10)}</p>
                        <button className="edit"><Link to={`/edit/${e._id}`} >Edit</Link></button>
                        <button onClick={() => { deleteIt(e._id, i) }} className="delete">Delete</button>
                    </div>
                ))}
            </div>
        </>
    )
}