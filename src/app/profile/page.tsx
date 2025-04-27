"use client"
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function UserProfile(){

const router = useRouter();
const  logout = async () => {
    try {
        await axios.get('/api/user/logout');
        router.push("/login")
    } catch (error:any) {
       console.log(error.message);
    }
}    
    return (
        <div>
            <h1>Profile Page</h1>
            <p>Welcome to profile page</p>
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
        
    )
}
