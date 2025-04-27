import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

status:400
export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        console.log(reqBody);  //todo will remove this in production

        const user = await User.findOne({email})

        if (user){
            return NextResponse.json({error: "User already exists.",status:400})
        }

        // hashing
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({username,email,password:hashedPassword}).save();

        return NextResponse.json({message: "User created successfully!",status:201,success:true})

    } catch(error:any){
        return NextResponse.json({error:error.message},
            {status: 500})
    }
}