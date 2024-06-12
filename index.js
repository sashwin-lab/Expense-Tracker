/**
 * expense tracker
 * 
 * adding a new expense - /add-expense :post
 * view existing expense - /get-expenses :get
 * deleting 
 * updating existing ones -/update
 */
const express=require('express')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const {Expense}=require('./schema.js')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(bodyparser.json())
async function connectodb(){
    try {
        await mongoose.connect('mongodb+srv://swethaboobathy19:Swetha-19@cluster0.t30un9j.mongodb.net/Expensetracker?retryWrites=true&w=majority&appName=Cluster0')
    console.log('DB connection established ')
    const port =5000
    app.listen(port,function(){
    console.log(`listening on port ${port}...`)
    })
}catch(error){
    console.log(error)
    console.log('Db connection failed')
}
}
connectodb()
app.get('/get-expenses',async function(request,response){
    try{ const expensedata = await Expense.find()
     response.status(200).json(expensedata)
    }catch(error){
        response.status(500).json({
        "status":"failure",
        "Message":"couldn't fetch data",
        "error":error
        })
    }
})
app.post('/add-expenses',async function(request,response){
  try{
        await Expense.create({
        "amount":request.body.amount,
        "category":request.body.category,
        "date":request.body.date 
       })
   response.status(200).json({
    "status":"success",
    "message":"Entry created"
   })
}catch(error){
response.status(500).json(
    {
        "status":"failed",
        "error":error,
        "message":"Entry invalid"
    }
)
}
})
app.delete('/delete-expenses/:id',async function(request,response){
 try {const expenseenetry= await Expense.findById(request.params.id)
 if(expenseenetry){
     await Expense.findByIdAndDelete(request.params.id)
    response.status(200).json({
        "status":"success",
        "message":"couldn't find entry"
    })
 } else{
    response.status(500).json(
        {
"status":"failure",
"message":"entry deletion failed"
        }
    )
 }
 }catch(error){
    response.status(500).json(
        {
            "status":"failed",
            "error":error,
            "message":"Entry invalid"
        }
    )   
 }
})
app.patch('/update-expenses/:id',async function(request,response){
    try {const expenseenetry= await Expense.findById(request.params.id)
    if(expenseenrty){
       await expenseenetry.updateOne({
        "amount" : request.body.amount,
        "category" : request.body.category,
        "date" : request.body.date
    })
    response.status(200).json({
        "status" : "success",
        "message" : "successfully updated the entry"
    })
}  
    else{
       response.status(500).json(
           {
   "status":"failure",
   "message":"entry deletion failed"
           }
       )
    }
    }catch(error){
       response.status(500).json(
           {
               "status":"failed",
               "error":error,
               "message":"Entry invalid"
           }
       )
    }
   })
   





