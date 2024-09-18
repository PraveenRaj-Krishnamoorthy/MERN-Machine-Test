import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Home = () => {
    const initialization = { user: "", email: "", num: "", gender: "", designation: "", course: "" };
    const [formData, setFormData] = useState(initialization)
    const [isBSc, setIsBSc] = useState(false);
    const [isMSc, setIsMSc] = useState(false);
    const { id } = useParams()
    const [upId, setUpId] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            setUpId(id)
            const getData = async () => {
                try {
                    await axios.get(`http://localhost:8081/api/employee/${id}`)
                        .then((res) => {
                            if (res.data.course === "B.Sc/M.Sc") {
                                setIsBSc(true)
                                setIsMSc(true)
                            } else {
                                if (res.data.course === "B.Sc") {
                                    setIsBSc(true)
                                } else if (res.data.course === "M.Sc") {
                                    setIsMSc(true)
                                }
                            }
                            setFormData({ ...res.data })
                        }).catch((err) => {
                            console.log(err);
                        })
                } catch (error) {
                    console.log(error);
                }
            }
            getData();
        }
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const submitForm = (event) => {
        event.preventDefault()
        formData.course = (isBSc && isMSc) ? "B.Sc/M.Sc" : isBSc ? "B.Sc" : isMSc ? "M.Sc" : ""
        let nullData = ""
        for (var key in formData) {
            if (formData[key] === "") {
                nullData += `${key}, `
            }
        }
        if (nullData === "") {
            if (id) {
                // update data
                const updateIt = async () => {
                    try {
                        await axios.put(`http://localhost:8081/api/update/${id}`, formData)
                            .then((res) => {
                                alert("Updated Successfully");
                                navigate("/alldata")
                            }).catch((err) => {
                                alert("Unique email id required");
                            })
                    } catch (error) {
                        console.log(error);
                    }
                }
                updateIt();
                setUpId("")
            } else {
                const addIt = async () => {
                    try {
                        await axios.post("http://localhost:8081/api/create", formData)
                            .then((res) => {
                                alert("Data added successfully");
                                navigate("/alldata")
                            }).catch((err) => {
                                alert("Unique email id required");
                            })
                    } catch (error) {
                        console.log(error);
                    }
                }
                addIt();
            }
        } else {
            nullData = nullData.slice(0, -2)
            alert(`Required: ${nullData}`)
        }
        resetIt()
    }
    const resetIt = () => {
        setFormData(initialization)
        setIsBSc(false)
        setIsMSc(false)
    }
    return (
        <>
            <div className="create">
                <h1 style={{ textAlign: "center", margin: "17px 0px" }}>Create!</h1>
                <NavBar />
                <form onSubmit={submitForm}>
                    <table>
                        <tbody>
                            <tr>
                                <td className="label">Employee Name: </td>
                                <td><input type="text" name="user" value={formData.user} placeholder="enter user.." onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td className="label">Employee Email:</td>
                                <td><input type="email" name="email" value={formData.email} placeholder="enter email.." onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td className="label">Employee Number:</td>
                                <td><input type="number" name="num" value={formData.num} placeholder="enter number.." onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td className="label">Employee Gender:</td>
                                <td><input type="radio" name="gender" checked={formData.gender === "male"} value={"male"} onChange={handleChange} />&nbsp; Male &nbsp;&nbsp;
                                    <input type="radio" name="gender" checked={formData.gender === "female"} value={"female"} onChange={handleChange} />&nbsp; Female
                                </td>
                            </tr>
                            <tr>
                                <td className="label">Employee Designation:</td>
                                <td>
                                    &nbsp; &nbsp;<select name="designation" value={formData.designation} onChange={handleChange}>
                                        <option value="">default</option>
                                        <option value="HR">HR</option>
                                        <option value="Manager">Manager</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="label">Employee Course:</td>
                                <td>
                                    <input type="checkbox" name="course" checked={isBSc} value={isBSc} onChange={(e) => { setIsBSc(e.target.checked) }} /> &nbsp; B.Sc &nbsp;&nbsp;
                                    <input type="checkbox" name="course" checked={isMSc} value={isMSc} onChange={((e) => { setIsMSc(e.target.checked) })} />&nbsp; M.Sc
                                </td>
                            </tr>
                            <tr>
                                <td className="label">Employee Photo: </td>
                                <td><input type="file" name="file" id="" /></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td><button>{!upId ? "Submit" : "Update"}</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    )
}