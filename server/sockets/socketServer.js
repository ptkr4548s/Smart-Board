const { addUser, getUser, removeUser, getUsersInRoom } = require("../utils/users");

let roomIdGlobal, imgURLGlobal;

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on("userJoined", (data) => {
            const { name, userId, roomId, host, presenter } = data;
            roomIdGlobal = roomId;
            socket.join(roomId);
            const users = addUser({ name, userId, roomId, host, presenter, socketId: socket.id });
            socket.emit("userIsJoined", { success: true, users });
            socket.broadcast.to(roomId).emit("userJoinedMessageBroadCasted", name);
            socket.broadcast.to(roomId).emit("allUsers", getUsersInRoom(roomId)); // Emit updated users list
            socket.broadcast.to(roomId).emit("whiteBoardDataResponse", { imgURL: imgURLGlobal });
        });

        socket.on("whiteboardData", (data) => {
            imgURLGlobal = data;
            socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", { imgURL: data });
        });

        socket.on("message", (data) => {
            const { message } = data;
            const user = getUser(socket.id);

            if (user) {
                socket.broadcast.to(roomIdGlobal).emit("messageResponse", { message, name: user.name });
            }
        });
        socket.on("leaveRoom", (data) => {
            
            const user = getUser(socket.id);
            
                if (user) {
                    removeUser(socket.id);
                    socket.broadcast.to(roomIdGlobal).emit("userLeftMessageBroadCasted", user.name);
                    socket.broadcast.to(roomIdGlobal).emit("allUsers", getUsersInRoom(roomIdGlobal)); // Emit updated users list
                
            }
        });
        

        socket.on("disconnect", () => {
            const user = getUser(socket.id);
            if (user) {
                removeUser(socket.id);
                socket.broadcast.to(roomIdGlobal).emit("userLeftMessageBroadCasted", user.name);
                socket.broadcast.to(roomIdGlobal).emit("allUsers", getUsersInRoom(roomIdGlobal)); // Emit updated users list
            }
        });
    });
};

