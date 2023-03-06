const io = require("socket.io")(8900,{
    cors:{
        origin: "http://localhost:3000"
    }
});

let users = [];

const getUser = (username)=>{
    return users.find(user=>user.username === username);
};

const addUser = (username,socketId)=>{
    !users.some(user=>user.username === username) && users.push({username,socketId});
};

io.on("connection", (socket)=>{
    console.log("a user connected.")
    socket.on("addUser", username=>{
        addUser(username,socket.id);
    });
});

socket.on("sendMessage", ({username,recievername,text}) => {
    const user = getUser(recievername);
    io.to(user.socketId).emit("getMessage",{
        username,
        text,
    });
});