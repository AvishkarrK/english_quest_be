const mongoose = require("mongoose");
const connection=mongoose.connect("mongodb+srv://aavishkark:3G9ycYMyKcSIwLKn@cluster0.wvrt9o0.mongodb.net/notes_backend?retryWrites=true&w=majority")
module.exports={
    connection 
}