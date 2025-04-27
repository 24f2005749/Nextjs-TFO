import mongoose from 'mongoose';

export async function connect(){
    try{

        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log('MongoDB connected successfully!');
        })

        connection.on('error',(error:any) =>{
            console.log('MongoDB connection error. Please make sure MongoDB is running.'+error);
            process.exit();
        })

    }catch (error){
        console.log('Something went wrong!');
        console.log(error);
        
    }
}
