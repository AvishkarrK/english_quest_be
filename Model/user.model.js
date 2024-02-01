const mongoose=require("mongoose")
const useSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:String,
},{
    versionKey:null
})
const UserModel=mongoose.model('userengquest',useSchema)
module.exports={UserModel}