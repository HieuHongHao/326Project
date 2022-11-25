import { api } from './api.js';

export const chat = {
    init: async () => {
        const socket = io("http://localhost:9000");
        // const PORT = process.env.PORT;
        // const socket = io("https://cs326project.herokuapp.com:9000");
        // const socket = io("/");
        // const socket = io("https://cs326project.herokuapp.com:" + request.socket.localPort);
        // const socket = io();
        // const socket = io("128.119.202.240:9000");

        const chatColor = ["blue","green","yellow","red","purple"];
        const userChatColor = {};
        
        
        const userId = localStorage.getItem("loggedIn");
        const postId = 0;
        // const res1 = await fetch("../api/canvas.json");
        // const canvasDB = await res1.json();
        
        // const users = await canvasDB.filter(x=>x.postId === postId)[0]["users"]
        

        let textInput = document.getElementById("text-input");
        socket.timeout(1000).emit("login", userId)
        // const users = ["alpha","beta"];
        
        async function addChatElement(message, sender, isIncoming){
            if(isIncoming && sender === userId){
                return;
            }
            const chatElement = document.createElement("div");
            const innerChat = document.createElement("div");
            const chatBox = document.getElementById("chat-texts");
            chatElement.classList.add("text");
            if(isIncoming){
                //Display user info in chat
                const usersDB = await api.fetchData('users');
                const user = usersDB.filter(x => x._id.toString() === sender.toString())[0];
                const imgElement = document.createElement("img");
                imgElement.src = user["avatar"];
                imgElement.crossOrigin = "anonymous";
                chatElement.appendChild(imgElement);
                const nameElement = document.createElement("span");
                nameElement.innerHTML = user.username;
                chatElement.appendChild(nameElement);
                //User chat color
                innerChat.classList.add(getUserChatColor(sender.toString()) + "-text");
            }
            else{
                const dummyText = document.createElement("div");
                dummyText.classList.add("text-dummy")
                chatElement.append(dummyText);
                innerChat.classList.add("my-text");
            }
            innerChat.innerHTML = message;
            chatElement.appendChild(innerChat);
            chatBox.appendChild(chatElement);
            autoScroll();
        }

        function getUserChatColor(user){
            if (!(user in userChatColor)){
                userChatColor[user] = shuffle(chatColor)[0]
            }
            return userChatColor[user];
        }

        textInput.addEventListener("keypress",(event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                if(textInput.value === ""){
                    return;
                }
                const payload = {
                    sender: userId,
                    message: textInput.value,
                    receiver: postId
                }
                
                socket.emit("chat-message", payload);
                addChatElement(textInput.value, userId, false);
                textInput.value = "";
            }
        })
        
        socket.on("chat-message",(payload) => {
            const {sender,message,receiver} = payload;
            if(parseInt(receiver) === postId){
                addChatElement(message, sender, true);                
            }
        })
    }
}

export function autoScroll(){
    const texts_container = document.getElementById("chat-texts");
    texts_container.scrollTop = texts_container.scrollHeight - texts_container.clientHeight;
}

function shuffle(array) { 
    let m = array.length;
    
    // While there remain elements to shuffle...
    while (m) {
        // Pick a remaining element...
        const i = Math.floor(Math.random() * m--);
	
        // And swap it with the current element.                                                                              
        const t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    
    return array;
}