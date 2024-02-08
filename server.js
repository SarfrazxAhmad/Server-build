// 1st server : 

const http = require("http");

const port = 8081; // local port num

// HTTP Methods :

/*
>> GET: Inorder to get data from server
>> POST: Sending data to server
>> DELETE: Deleting the data from database
>> PATCH: Updating certain fields
>> PUT: Full Update
*/

const todoList = ["learn", "apply things", "succeed"];

http
  .createServer((req, res) => {
    // call back func
    const { method, url } = req ;   // ON REQUEST WE GET THE GET / 

    // console.log(method, url); 

    if(url === "/build"){
      if (method === "GET"){
          res.writeHead(200 , {"Content-Type":"text/html"});
          res.write(todoList.toString());  //Array.String (JS method) *Note: Dot in between the array and string
      }else if (method === "POST"){
        let body = "";
        // *Event 1:
        req.on('error',(err) => {                                      // err- information
          console.log(err)
        }).on('data',(chunk) => {                                      // chunk - callbackfunction (Any name)
           body += chunk;                                              // data get pass in the chunk format. 
          //  console.log(chunk);                                      // Buffer Execution
        }).on('end',() =>{
           body = JSON.parse(body);
           let newtodo = todoList;                                     // Creating a new todolist in the array.
           newtodo.push(body.name);
           console.log(newtodo);
          //  console.log("data:", body)                               
        });
        }else if(method === "DELETE") {
          let body = '';
          req
          .on("error", (err) => {                                         // event - error 
             console.error(err);
          })
          .on("data" , (chunk) => {
            body += chunk;
          })
          .on("end", () => {
            body = JSON.parse(body);

            let deleteThisItem = body.item;
            for (let i = 0; i < todoList.length; i++) {
              if (todoList[i] === deleteThisItem) {
                todoList.splice(i, 1);
                break;
              } else {
                  console.error("Error: Match Not Found!!");
                  break;
                }
            }
          });
      } else {
        res.writeHead(501);}                                   
      }         
    res.end();                 
    })    
    .listen(port, () => {
            console.log(`Node JS Server Started Running   on port : ${port}`);
    }); 