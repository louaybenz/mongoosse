const express = require("express");
const app = express();

const mongoose = require("mongoose");
require("dotenv").config();

const person = require("./models/Person");
const uri=process.env.DB_URI
mongoose.connect (uri, 
    {
useNewUrlParser: true,
useCreateIndex: true,
useFindAndModify:false,
useUnifiedTopology: true
},

    (err) => {
  if (err) throw err;
  console.log("db connected");
});

app.use(express.json());

/*const {firstname, lastname, email, password}=req.body
    pp.post('/newperson', (req,res)=>{
       
     const newUser = new user( {  
         firstname,
         lastname,
         email,
         password, */

 app.post("/newperson", (req, res) => {
     //console.log(req.body)
     const {name,age,favoriteFoods}=req.body
     const newPerson = new person({
         name ,
         age ,
         favoriteFoods 
     });
        newPerson
          .save()
          .then((data) => res.status(200).json(data))
          .catch((err) => res.status(400).json(err));
  });

//find person
person.find((err,data)=>{
    if (err) throw err
    console.log(data)
})
//find one peron with favouritefoods

person.findOne({favouriteFoods:{$in:['pizza']}})
.then((data)=>console.log(data))
.catch((err)=>console.log(err))

//using .findById() to Return a Single Matching Document from my Database

person.findById('6092777bb9e4a71dd8dfb484', (error ,data)=>{
  if (error) {
  console.log(error)
}
else {
  console.log(data)
}
})
//Perform Classic Updates by Running Find, Edit, then Save

person.findOne({name:'brahim'},(error ,data)=>{
  if (error) {
  console.log(error)
}
else {
  data.favoriteFoods.push('hamburger')
  console.log(data)
}
})
// updating age 
person.findOneAndUpdate({name : 'hatem'}, {age : 20}, (error ,data)=>{
  if (error) {
  console.log(error)
}
else {
  console.log(data)
}
})

// Delete One Document Using model.findByIdAndRemove

person.findOneAndRemove({name:'amir'},(error ,data)=>{
  if (error) {
  console.log(error)
}
else {
  console.log(data)
}
})

//MongoDB and Mongoose - Delete Many Documents with model.remove() im going to remove imed cause i on't have Mary :)
var removeManyPeople = function (done){
  var nameToRemove="Imed";

person.remove({name : nameToRemove }, (error , JSONstatus) =>(error ,data)=>{
  if (error) {
  console.log(error)
}
else {
  console.log(null , JSONstatus)
}
})
}

//Chain Search Query Helpers to Narrow Search Results

person.find({favoriteFoods:{$all:['burritos']}})
.select('-age')
.limit(2)
.sort({name :'asc' })
.exec((error,data)=>{
  if(!error){
    console.log(data)
  }
})

//    app.get("/",(req,res)=>{
//        person.find()
//        .then((data)=>res.send(data))
//        .catch((err)=>res.status(400).send(err))
      
//  }
//    )

app.listen(5000, () => {
  console.log("connected");
});
