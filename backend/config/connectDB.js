const mongoose=require("mongoose");
const mongoURI=process.env.MONGO_URI;

const connectDB= async()=>{
    try{
      await mongoose.connect(mongoURI);
      console.log("Connected to MongoDB successfully!");
    }catch(error){
        console.error("Error in connecting database")
    }
}

module.exports={connectDB};