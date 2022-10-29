const socket = io("http://localhost:3000");
console.log(socket);

let textInput = document.getElementById("text-input");
const username = localStorage.getItem("username");
const users = ["Alpha Shrek","Shrek FanBoy"];



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