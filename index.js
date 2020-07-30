require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://"+process.env.DBUSER+":"+process.env.DBPASS+"@cluster.nvsgd.mongodb.net/"+process.env.DBPASS+"?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const app = express();
app.use(express.json());
app.get('/api/data',(req,res) =>{
    client.connect(err => {
        const collection = client.db("test").collection("users");
        collection.find().toArray((error, documents)=>{
            if(error){
                throw error;
            }
            res.send(documents)
        })
        client.close();
      });
      
});
app.post('/api/users',(req, res)=>{
    client.connect(err => {
        const collection = client.db("test").collection("users");
        collection.insertOne(req.body,(error, result)=>{
            if(error){
                throw error;
            }

            res.send(result.insertedId);
        })
        client.close();
      });
      
})
app.listen(process.env.PORT,console.log("WebServer is Working!!! and Listening to that Port"));