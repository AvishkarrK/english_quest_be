const express=require('express')
const app=express()
const cors=require('cors')
const connection=require('./db')
const { userRouter } = require('./Routes/users.routes')
const { bookRouter } = require('./Routes/book.routes')
app.use(cors())
app.use(express.json())
app.use('/users',userRouter)
app.use('/books',bookRouter)
app.get('/',(req,res)=>{
    res.send({"msg":"This is the home page for testing the server"}) 
})
app.listen(4500,async()=>{
    await connection
    console.log("App connected to atlas")
    console.log("App running on port 4500")
})