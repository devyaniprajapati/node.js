const http=require("http");
const fs=require("fs")

const server=http.createServer((req,res)=>{
   if(req.url=="/home")
   {
    console.log("Welcome")
    res.end("Home")
   }
   else if(req.url=="/about"){
    console.log("about")
    res.end("About")
   }
   else if(req.url=="/getproductdata"){
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            res.end(err)
        }
        else
        {
            const productdata=JSON.parse(data)
            res.end(JSON.stringify(productdata.products))
        }
    })
   }
   else if(req.url=="/user")
   {
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err)
        {
            res.end(err)
        }
        else{
            const userdata=JSON.parse(data)
            res.end(JSON.stringify(userdata.user))
        }
    })
   }
})

server.listen(8080,()=>{
    console.log("server is Running")
})