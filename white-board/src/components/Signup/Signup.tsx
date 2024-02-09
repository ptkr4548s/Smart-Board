import React, { useState } from "react"
import "./signup.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
type Values = {
    name : string,
    email : string,
    password : string,
    reEnterPassword : string,
}

const Signup= () => {

    const navigate = useNavigate()

    const [values,setValues] = useState<Values>({
        name : "",
        email : "",
        password: "",
        reEnterPassword: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values,[event.target.name] : event.target.value});
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = values
        if( name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:8000/register", values)
            .then( res => {
                alert(res.data.message)
                navigate("/login")
            })
        } else {
            alert("invlid input")
        }
        
    }

    return (
        
        <div className="register">
          
            <h1>Register</h1>
            <input type="text" name="name" value={values.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={values.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={values.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={values.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/login")}>Login</div>
        </div>

    )
}

export default Signup