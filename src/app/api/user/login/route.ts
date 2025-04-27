import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

status:400
export async function POST(request:NextRequest){
    try {
        const requestBody=await request.json();
        const {username,password}=requestBody;
        console.log(requestBody);

        const user = await User.findOne({username});


        if (!user){
            return NextResponse.json({error:"User does not exist.",status:400})
        } 

        const validPassword = await bcryptjs.compare(password,user.password)

        if (validPassword){
            const tokenData = {
                id:user._id,
                username:user.username,
                email:user.email
            }

            const token = await jwt.sign(tokenData,process.env.TOKEN!,{expiresIn:"1h"});
            const response = NextResponse.json({
                message: "Login successful",
                success: true,
            })
            response.cookies.set("token",token,{httpOnly:true,path:"/"})
            return response;

        } else {
            return NextResponse.json({error:"Incorrect Password",status:400})
        }

    } catch (error) {
        console.log("Internal server error.")
    }
} 