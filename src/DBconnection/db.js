import mongoose from "mongoose"
const mongoUri = "mongodb://127.0.0.1:27017/plaza"



export const connectTOMongo = () => {
    try {
  
        mongoose.connect(mongoUri)
        console.log("connected to databaase")
    } catch(error) {
console.log("some error occurred during connection",error)
    }
}

export default connectTOMongo