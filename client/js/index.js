let conversationId = null;
let senderId = null;
let conversation = {};
document.querySelector(".get-convo-btn").addEventListener("click", (e)=>{
    const creatorInp = document.querySelector(".inptxt-Creator");
    const participantInp = document.querySelector(".inptxt-Participant");
    const body = { creatorId: Number(creatorInp.value), participantId: Number(participantInp.value)}
    console.log("verifying user:", JSON.stringify(body));
    // Use fetch API as TCP fallback
    fetch('http://localhost:3003/api/v1/conversations/direct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => response.text())
    .then(data => {
        document.querySelector("#txtA1").value = `Conversation ID: ${JSON.parse(data).data.id}`;
        console.log("data: ", JSON.parse(data), JSON.parse(data).data.id);
        conversation = JSON.parse(data).data;
        conversationId = JSON.parse(data).data.id
        senderId = Number(creatorInp.value);
        console.log("senderId: ", senderId);
        // creatorInp.value = "";
        // participantInp.value = "";
    })
    .catch(error => console.error('Error:', error));
});



document.querySelector(".ws-btn").addEventListener("click", (e)=>{
    const ws = new WebSocket("ws://localhost:3003");
    document.querySelector(".sendBtn").addEventListener("click", (e)=>{
        const content = document.querySelector(".inptxt-message").value;
        console.log("Sending:", JSON.stringify(content));
        ws.send(JSON.stringify({ conversationId, senderId, content}));
    });
    ws.onopen = () => {
        alert("websockt connnection succesfull...")
        console.log("Connected");
    };
    ws.onmessage = (event) => {
        console.log(event.data);
        document.querySelector("#txtA2").value += event.data + "\n";   
    };
});


document.querySelector(".tcp-btn").addEventListener("click", (e)=>{
    alert("tcp connection succesfull...")
    document.querySelector(".sendBtn").addEventListener("click", (e)=>{
        const content = document.querySelector(".inptxt-message").value;
        const body = { senderId, content };
        console.log("Sending body:", JSON.stringify(body));
        fetch(`http://127.0.0.1:3003/api/v1/conversations/${conversationId}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(response => response.text())
        .then(data => {
            document.querySelector("#txtA2").value += data + "\n";   
            console.log("data: ", data);
        })
        .catch(error => console.error('Error:', error));
    });
});








// let wsupgraded = false;
// let tcpupgraded = true;
// let socket;

// document.querySelector(".ws-btn").addEventListener("click", (e)=>{
    
//     if (wsupgraded) {
//         console.log("Already upgraded to WebSocket.");
//         return;
//     }
    
//     // Close existing socket if any
//     if (socket) {
//         socket.close(1000, 'Switching to WebSocket');
//     }
    
//     socket = new WebSocket("ws://localhost:3000 ");

//     socket.onopen = () => {
//         console.log("Upgraded to WebSocket.");
//         wsupgraded = true;
//         tcpupgraded = false;
//         setupWebSocketListeners();
//     };

//     socket.onmessage = (event) => {
//         console.log("Received message:", event);
//         document.querySelector("#txtA1").value += event.data + "\n";   
//     };

//     socket.onerror = (error) => {
//         console.log("WebSocket error:");
//         console.error(error);
//     };

//     socket.onclose = (event) => {
//         console.log("WebSocket closed:", event.code, event.reason);
//         wsupgraded = false;
//     };
    
// });

// document.querySelector(".tcp-btn").addEventListener("click", (e)=>{
    
//     if (tcpupgraded) {
//         console.log("Already On TCP.");
//         return;
//     }

//     // Close WebSocket
//     if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.close(1000, 'Switching to TCP');
//         wsupgraded = false;
//         tcpupgraded = true;
//         console.log("Switched to TCP mode (using HTTP as fallback)");
//         setupHTTPListeners();
//     }
// });

// function setupWebSocketListeners() {
//     const input = document.querySelector(".inptxt");
//     input.removeEventListener("keypress", handleHTTPKeyPress);
//     input.addEventListener("keypress", handleWebSocketKeyPress);
// }

// function handleWebSocketKeyPress(event) {
//     if (event.key === "Enter") {
//         socket.send(event.target.value);
//         // socket.send("Hello from WebSocket!");
//         // socket.send("abrar");
//         // socket.send("A".repeat(123) + "BC");
//         // socket.send("D".repeat(65533) + "EF");
//         // socket.send("G".repeat(65535) + "HI");
//         event.target.value = "";
//     }
// }

// function setupHTTPListeners() {
//     const input = document.querySelector(".inptxt");
//     input.removeEventListener("keypress", handleWebSocketKeyPress);
//     input.addEventListener("keypress", handleHTTPKeyPress);
// }

// function handleHTTPKeyPress(event) {
//     if (event.key === "Enter") {
//         // Use fetch API as TCP fallback
//         fetch('http://localhost:3003/chat', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ message: event.target.value })
//         })
//         .then(response => response.text())
//         .then(data => {
//             document.querySelector("#txtA1").value = data;
//         })
//         .catch(error => console.error('Error:', error));
        
//         event.target.value = "";
//     }
// }