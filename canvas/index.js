const socket = io("http://localhost:3000");
console.log(socket);

let textInput = document.getElementById("text-input");
let username;

function addChatElement(message){
    const chatElement = document.createElement("div");
    chatElement.classList.add("text");
    const innerChat = document.createElement("div");
    innerChat.classList.add("blue-text")
    innerChat.innerHTML = message;
    chatElement.appendChild(innerChat);
    document.getElementsByClassName("chat-container")[0].appendChild(chatElement);
}

textInput.addEventListener("keypress",(event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const payload = {
            message: "Thanos pogger",
            receiver: username
        }
        socket.emit("send-message",payload)
    }
})
socket.on("consume-inbox",(payload) => {
    const {sender,message} = payload;
    addChatElement(message);
})


socket.on("response-message",(payload) => {
    const {sender,message} = payload;
    addChatElement(message);
})