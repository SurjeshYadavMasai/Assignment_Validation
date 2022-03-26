const app=require("./index.js");

//connecting mongo db
const connect = require("./configs/db.js");

app.listen(4000,async()=>{
    await connect();
    console.log("Listening on port 4000");
});