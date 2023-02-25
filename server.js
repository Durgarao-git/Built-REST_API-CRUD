const express=require("express")
const mysql=require('mysql2')
const bodyParser=require("body-parser")

const app=express()
app.use(bodyParser.json())

//DB connection

const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"12345",
    database:"school"
});

//DB connection checking

db.connect((err,res)=>{
    if(err){
        throw err
    }
    else{
        console.log("Database connected sucessfully")
    }

})

//set Record

app.post("/register/student/add",(req,res)=>{

    let details={
        name:req.body.name,
        age:req.body.age,
        course:req.body.course
    };

    let sql="INSERT INTO student set ?"

    db.query(sql,details,(err)=>{
        if(err){
            res.send({status:false,message:"Student Created Failed"})
        }
        else{
            res.send({status:true,message:"Student Created Succesful"})
        }

    })

})
 
//View Record

app.get('/register/student/view',(req,res)=>{
    let sql="SELECT * FROM student"
    db.query(sql,(err,result)=>{
        if(err){
            res.send({status:false,message:"view record is failed"})
            console.log(err)
        }
        else{
            res.send({status:true,message:"view record is succesful",data:result})
        }
    })
});

//Search Record 

app.get('/register/student/:id',(req,res)=>{
    let stdid=req.params.id
    let sql="SELECT * FROM student WHERE id=" +stdid
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send({status:true,data:result})
        }
    })
})

//update Record

app.put("/register/student/update/:id",(req,res)=>{
    let sql =
      "UPDATE student SET name='" +
      req.body.name +
      "', age='" +
      req.body.age +
      "',course='" +
      req.body.course +
      "'  WHERE id=" +
      req.params.id;

      db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send({status:true,data:result})
        }
      })
})

//delete Record

app.delete("/register/student/delete/:id",(req,res)=>{
    let sql="DELETE FROM student WHERE id=" +req.params.id;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send({status:true,data:result})
        }
    })
})


app.listen(8000,()=> {
    console.log("server is running")
})
