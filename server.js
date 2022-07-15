const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const jwt = require("jsonwebtoken");

 const veryFyJwt = (req, res, next) => {
  const autHeader = req.headers.authorization;
   if(!autHeader){
    return res.status(401).send({message: 'unAuthorization'})
   }
   const token = autHeader.split(' ')[1]
   jwt.verify(token, process.env.SECRET_TOKEN_SECRET, function(err, decoded){
      if(err){
        return res.status(403).send({message: 'forbidden access'})
      }
      req.decoded = decoded;
      next()
   })

 } 

// middleware
app.use(cors());
app.use(express.json());


app.get('/order', veryFyJwt, (req, res) => {
  res.send([{name:'salam', age: 10, id: 1, role: 'Armi'}, {name:'samso', age: 13, id: 2, role: 'normal'}])
})



app.post("/login", (req, res) => {
  const user = req.body;
  if (user.email === "raja@rani.com" && user.password === "12345") {
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.SECRET_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.send({ success: true, accessToken });
  }
  res.send({ success: false });
});

app.get("/", (req, res) => {
  res.send("server is Running");
});

app.listen(port, () => {
  console.log("server is running port --->", port);
});
