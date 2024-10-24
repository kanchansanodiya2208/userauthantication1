import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {

    const navigate = useNavigate();
    const [cookies, revmoveCookie] = useCookies([]);
    const [username, setusername] = useState();
    useEffect(()=>{
        const verifycookie = async () => {
            console.log(cookies.Token);
            if(!cookies.Token) {
                navigate("/Login")
            }
            const {data} = await axios.post(
                "http://localhost:8080",
                {},
                {withCredentials: true},
            );

            const {status,user} = data;
            setusername(user);
            // console.log(user);
            return status
            ? toast(`Hello ${user}`,{
                position: "top-right",
            })
            :(revmoveCookie("Token"),navigate("/Login"));
             
        }
        verifycookie();
    },[cookies, navigate, revmoveCookie]);

    const logout = () => {
        revmoveCookie("Token");
        navigate("/Signup");
    }



    return(
        <>
        <div className="home_page">
         <h4>
            {""}
            Welcome! <span>{username}</span></h4>
         <button onClick={logout}>Logout</button>
        </div>
       <ToastContainer />
       </>
    );
};
export default Home;