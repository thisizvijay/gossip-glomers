const http = require("http");

const server= http.createServer((request,response)=>{
    let data="";
    request.on("error",(err)=>{
        console.log(err);
    });
    request.on("data", chunk=>{
        data+=chunk;
    });
    request.on("end",()=>{
        const message=JSON.parse(data);
        console.log(message);
        if(message.body.type==="echo"){
            const res={
                ...message,
                body:{
                    ...message.body,
                    type:"echo_ok",
                    in_reply_to:message.body.msg_id
                }
            }
            response.writeHead(200,{"Content-Type":"application/json"});
            response.end(JSON.stringify(res));
        }
    })
});

server.listen(8080,()=>{
    console.log("Server is listening on port 8080");
})