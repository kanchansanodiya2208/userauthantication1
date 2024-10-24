import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();
    const [inputValue, SetInputValue] = useState({
        email: "",
        password: "",
    });

    const {email,password} = inputValue;
    const handleOnChange = (e) => {
        const {name,value} = e.target;
        SetInputValue({
         ...inputValue,
         [name]: value,
        });
 };

 const handleError = (err) => {
    console.log(err);
    toast.error(err, {position: "bottom-left"})
  }
  const handleSuccess = (msg) => {
    toast.success(msg, {position: "bottom-right"})
}

const handleSubmit = async(e) => {
    e.preventDefault();
    try {
       
        const {data} = await axios.post(
            "http://localhost:8080/Login",
            {
                ...inputValue,
            },
            {withCredentials: true}
        );
        const {success, message} = data;
        if(success) {
            console.log("success");
            navigate("/");
            handleSuccess(message);
            setTimeout(()=>{
                navigate("/");
            }, 1000);
        }
        else{
            handleError(message);
        }
    } catch (error) {
        console.log(error);
    }
    SetInputValue({
        ...inputValue, email: '', password: ''
    })
} 

    return(
        <>
      <div className="form_container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input  type="email" name="email" value={email} placeholder="Enter your Email" onChange={handleOnChange}/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input  type="password" name="password" value={password} placeholder="Enter Your Password" onChange={handleOnChange}/>
                </div>

                <button type="submit">Submit</button>
                <span>
                    Already Have Account?<Link to={"/Signup"}>SignUP</Link>
                </span>

            </form>

        </div>
        
        </>
    );
};
export default Login;