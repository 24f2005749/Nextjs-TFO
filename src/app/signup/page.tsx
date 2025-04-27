"use client"
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link";


export default function SignupPage(){
const router = useRouter();

    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(true);

    const [loading,setLoading] = React.useState(false);

    const onSignup = async ()=>{
        try {
            
            setLoading(true);
            const response = await axios.post("/api/user/signup",user);
            console.log("Signup Success",response.data);
            router.push("/login");

        } catch (error:any) {
            
            console.log("Error sending data",error);
        } finally {
            
            setLoading(false);
        }
    }

    React.useEffect(() =>{
        if (user.email.length>0&&user.password.length>0&&user.username.length>0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user]);


    return (
       <div className="flex flex-col h-screen justify-center items-center rounded text-white m-5">
        <h1>{loading ? "loading" : "signup"}</h1>
        <label className="flex my-3" htmlFor="username">
            <p>Username</p> <input type="text" placeholder="username" id="username" value={user.username} onChange={(e)=> setUser({...user,username:e.target.value})} className="bg-white text-black mx-5" />
        </label>
        <label className="flex my-3" htmlFor="email">
            <p>email</p> <input type="text" placeholder="email" id="email" value={user.email} onChange={(e)=> setUser({...user,email:e.target.value})} className="bg-white text-black mx-5" />
        </label>
        <label className="flex my-3" htmlFor="password">
            <p>password</p> <input type="text" placeholder="password" id="password" value={user.password} onChange={(e)=> setUser({...user,password:e.target.value})} className="bg-white text-black mx-5" />
        </label>
        <button className="round bg-white text-black w-50 focus:border-gray-600" onClick={onSignup}>{buttonDisabled ? "No signup" : "Signup"}</button>
        <Link href="/login">Visit Login Page</Link>
       </div> 
        
    )
}

