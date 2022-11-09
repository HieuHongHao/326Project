

export const chat = {
    init: async () => {
        const socket = io("http://localhost:9000");

        const userChatColor = shuffle(["blue","green","yellow","red","purple"]);

        const postId = 1;
        const res1 = await fetch("../api/canvas.json");
        const canvasDB = await res1.json();
        const users = await canvasDB.filter(x=>x.postId === postId)[0]["users"]
        
        const userId = localStorage.getItem("loggedIn");
        // const res = await fetch("../api/users.json");
        // const usersDB = await res.json();
        // console.log(userId);
        // const user = usersDB.filter(x => x.id === parseInt(userId))[0];
        // console.log(user);

        let textInput = document.getElementById("text-input");
        socket.emit("login",userId)
        // const users = ["alpha","beta"];

        function addChatElement(message, isIncoming){
            const chatElement = document.createElement("div");
            const innerChat = document.createElement("div");
            const chatBox = document.getElementById("chat-texts");
            chatElement.classList.add("text");
            if(isIncoming){
                const userColor = userChatColor[users.indexOf(parseInt(userId))]
                innerChat.classList.add(userColor + "-text");
            }
            else{
                innerChat.classList.add("my-text");
            }
            innerChat.innerHTML = message;
            chatElement.appendChild(innerChat);
            chatBox.appendChild(chatElement);
            autoScroll();
        }
        textInput.addEventListener("keypress",(event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                for(let i=0; i<users.length; i++){
                    const payload = {
                        message: textInput.value,
                        receiver: users[i]
                    }
                    socket.emit("send-message",payload);
                }
            }
        })
        
        socket.on("inbox-message",(payload) => {
            const {sender,message} = payload;
            addChatElement(`From ${sender}: ` + message, false);
        })
        
        socket.on("response-message",(payload) => {
            const {sender,message} = payload;
            console.log(`From ${sender}: ` + message);
            addChatElement(`From ${sender}: ` + message, true);
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