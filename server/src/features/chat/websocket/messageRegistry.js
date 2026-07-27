// const chatMessageHandler = require("./handlers/chatMessageHandler");

// // Registry of all supported message types
// const messageHandlers = {
//     chat_message: chatMessageHandler,
// };

// module.exports = messageHandlers;




// const chatMessageHandler = require("./handlers/chatMessageHandler");
// const typingHandler = require("./handlers/typingHandler");

// module.exports = {
//     chat_message: chatMessageHandler,
//     typing_start: typingHandler,
//     typing_stop: typingHandler,
// };


module.exports = {
    chat_message: require("./handlers/chatMessageHandler"),
    typing_start: require("./handlers/typingHandler"),
    typing_stop: require("./handlers/typingHandler"),
    // typing_start: require("./handlers/typingStartHandler"),
    // typing_stop: require("./handlers/typingStopHandler"),
    // join_room: require("./handlers/joinRoomHandler"),
    // leave_room: require("./handlers/leaveRoomHandler"),
};