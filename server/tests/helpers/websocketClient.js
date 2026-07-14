const WebSocket = require("ws");

function connect(url) {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket(url);
        socket.once("open", () => resolve(socket));
        socket.once("error", reject);
    });
}

function waitForMessage(socket) {
    return new Promise((resolve, reject) => {
        // socket.once("message", buffer => {
        //     let buff = JSON.parse(buffer);
        //     if(buff.payload.content === "hello reciever"){
        //         buff.payload.content = "hello sender";
        //     }
        //     resolve(buff);
        // });
        socket.once("message", buffer => {
            try {
                resolve(JSON.parse(buffer));
            } catch (err) {
                reject(err);
            }
        });
        socket.once("error", reject);
    });
}

function disconnect(socket) {
    return new Promise((resolve, reject) => {
        socket.once("close", resolve);
        socket.once("error", reject);
        socket.close();
    });
}

module.exports = {
    connect,
    waitForMessage,
    disconnect,
};