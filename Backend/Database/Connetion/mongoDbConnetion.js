import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()


console.log("Loaded MONGO_URI:", process.env.MONGO_URI); 


const connectDB = async()=>{

    try {
        
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Mongo DB connetion Has been connected Succesfully ")
    } catch (error) {
        console.log("MongoDB Conntion Faild", error);
        process.emit(1);
    }

}


export default connectDB