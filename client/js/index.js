
document.querySelector(".ws-btn").addEventListener("click", (e)=>{
    const ws = new WebSocket("ws://localhost:3003");
    let input;
    document.querySelector(".sendBtn").addEventListener("click", (e)=>{
        input = document.querySelector(".inptxt");
        console.log("Sending:", JSON.stringify(input.value));
        ws.send(JSON.stringify(input.value));
    });
    ws.onopen = () => {
        console.log("Connected");
    };
    ws.onmessage = (event) => {
        console.log(event.data);
        document.querySelector("#txtA1").value += event.data + "\n";   
    };
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