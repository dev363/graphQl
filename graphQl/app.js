const express = require('express');
const graphqlHTTP= require('express-graphql')
const schema= require("./schema/schema")
const mongoose= require("mongoose")
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/graphql-DB",(err,data)=>{
  if(err) throw err;
  console.log("connected to database")
})

app.use("/graphql",graphqlHTTP({
  schema,
   graphiql: true
}));
app.get("/", (req, res)=>{
  res.json({status:200})
})
app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
