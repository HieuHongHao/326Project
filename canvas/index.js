const socket = io("http://localhost:3000");
console.log(socket);

let textInput = document.getElementById("text-input");
const username = localStorage.getItem("username");
const users = ["Alpha Shrek","Shrek FanBoy"];

function addChatElement(message){
    const chatElement = document.createElement("div");
    const innerChat = document.createElement("div");
    const chatBox = document.getElementById("chat-texts");
    chatElement.classList.add("text");
    
    innerChat.classList.add("blue-text");
    innerChat.innerHTML = message;
    chatElement.appendChild(innerChat);
    chatBox.appendChild(chatElement);
    autoScroll(chatElement);
}
function autoScroll(message){
    const messageStyle = getComputedStyle(message);
    const messageMargin = parseInt(messageStyle.marginBottom);
    const messageHeight = message.offsetHeight + messageMargin;
    const visibleHeight = message.offsetHeight;
    const containerHeight = message.scrollHeight;
    const scrollOffset = message.scrollTop + visibleHeight;
    if(containerHeight - messageHeight <= scrollOffset){
        message.scrollTop = message.scrollHeight;
    }
}

textInput.addEventListener("keypress",(event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const payload = {
            message: textInput.value,
            receiver: users[0] === username ? users[1] : users[0]
        }
        console.log("Hit enter");
        socket.emit("send-message",payload);
    }
})
socket.emit("login",username)

socket.on("inbox-message",(payload) => {
    const {sender,message} = payload;
    addChatElement(`From ${sender}: ` + message);
})

socket.on("response-message",(payload) => {
    const {sender,message} = payload;
    console.log(`From ${sender}: ` + message);
    addChatElement(`From ${sender}: ` + message);
})