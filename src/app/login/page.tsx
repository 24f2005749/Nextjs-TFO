"use client"
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link";


export default function LoginPage(){
const router = useRouter();

    const [user,setUser] = React.useState({
        password:"",
        username:"",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(true);

    const [loading,setLoading] = React.useState(false);


    const onLogin = async ()=>{
        try {
            
            setLoading(true);
            const response = await axios.post("/api/user/login",user);
            console.log("Login Success",response.data);
            router.push("/profile");

        } catch (error:any) {
            
            console.log("Error logging you in",error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() =>{
        if (user.password.length>0&&user.username.length>0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user]);


    return (
       <div className="flex flex-col h-screen justify-center items-center rounded text-white m-5">
        <h1>{loading ? "loading" : "Login"}</h1>
        <label className="flex my-3" htmlFor="username">
            <p>Username</p> <input type="text" placeholder="username" id="username" value={user.username} onChange={(e)=> setUser({...user,username:e.target.value})} className="bg-white text-black mx-5" />
        </label>
        <label className="flex my-3" htmlFor="password">
            <p>password</p> <input type="text" placeholder="password" id="password" value={user.password} onChange={(e)=> setUser({...user,password:e.target.value})} className="bg-white text-black mx-5" />
        </label>
        <button className="round bg-white text-black w-50 focus:border-gray-600" onClick={onLogin}>{buttonDisabled ? "No login" : "Login"}</button>
        <Link href="/signup">Visit Signup Page</Link>
       </div> 
        
    )
}

