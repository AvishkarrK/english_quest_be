const express=require('express')
const bookRouter=express.Router()
const {BooksModel}=require("../Model/book.model")
const auth=require("../Middleware/auth.middleware")

bookRouter.post('/addbook',async(req,res)=>{
    try{
        const book=new BooksModel(req.body)
        await book.save()
        res.status(200).send({"msg":"A new book has been added"})
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})
// bookRouter.get('/old',async(req,res)=>{
//     const tenMinutesAgo = new Date();
//     tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
//     try{
//         BooksModel.find({ createdAt: { $lt: tenMinutesAgo.toISOString() } }, (err, documents) => {
//             if (err) {
//               console.error('Error:', err);
//               return;
//             }
//             console.log('Documents created before 10 minutes ago:', documents);
//           })
//     }
//     catch(err){
//         res.status(400).send({"err":err})
//     }
// })
bookRouter.get('/sort',async(req,res)=>{
    const sort=req.body.sort
    let num
    if(req.body.sort=='asc'){
         num=1
    }
    else if(req.body.sort=='desc'){
        num=-1
    }
    try{
        const book=await BooksModel.find().sort({ price: num })
        res.status(200).send({"Books":book})
    }
    catch(err){
        res.status(400).send({"error":err})
    }
})
bookRouter.patch('/updatebook/:id',async(req,res)=>{
    const bookid=req.params.id;
    try{
        const book=await BooksModel.findOne({_id:bookid})
        if(book!=undefined){
            await BooksModel.findByIdAndUpdate(bookid,req.body)
            res.status(200).send({"msg":`The book with ID: ${bookid} has been updated`})
          }
          else{
            res.status(200).send({"msg":"Something Went Wrong"})
    }
}
    catch(err){
        res.status(400).send({"error":err})
    }
})
bookRouter.delete('/deletebook/:id',async(req,res)=>{
    const bookid=req.params.id;
    try{
        const book=await BooksModel.findOne({_id:bookid})
        if(book!=undefined){
            await BooksModel.findByIdAndDelete(bookid,req.body)
            res.status(200).send({"msg":`The book with ID: ${bookid} has been updated`})
          }
          else{
            res.status(200).send({"msg":"Something Went Wrong"})
    }
}
    catch(err){
        res.status(400).send({"error":err})
    }
})
bookRouter.get('/allbooks',async(req,res)=>{
    try{
        const books=await BooksModel.find({})
        res.status(200).send({"Books":books})
    }
    catch(err){
        res.status(400).send({"Error":err})
    }
})
module.exports={
    bookRouter
}