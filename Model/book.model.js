const mongoose=require("mongoose")
const bookSchema=mongoose.Schema({
    name:String,
    author:String,
    category:String,
    cover:String,
    price:Number,
    createdAt: {
        type: Date,
        default: Date.now,
      }
},{
    versionKey:null
})
const BooksModel=mongoose.model('booksengquest',bookSchema)
module.exports={BooksModel} 