const connectToMongo = require('./db');
var cors = require('cors');
const express = require("express");
const app = express();

connectToMongo();
const port = 5000;
app.use(cors(
   {
      origin:[""],
      methods: ["POST","GET"],
      credentials: true
   }
));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.get('/',(req,res)=>{
   return  res.status(200).json("HELLO From The backend");
})

app.listen(port, ()=>{
    console.log(`iNotebook backend listening at http://localhost:${port}`);
})
