import {api} from "./api.js";

export const chat = {
  init: async () => {
    // const socket = io("http://localhost:9000");
    // const PORT = process.env.PORT;
    // const socket = io("https://cs326project.herokuapp.com:9000");
    const socket = io("/");
    
    
    // const socket = io("https://cs326project.herokuapp.com:" + request.socket.localPort);
    // const socket = io();
    // const socket = io("128.119.202.240:9000");

    const chatColor = ["blue", "green", "yellow", "red", "purple"];
    const userChatColor = {};
    
    
    // const userId = localStorage.getItem("loggedIn");
    const user = await api.isLoggedIn();
    const userId = user.id;
    const postId = 0;
    // const res1 = await fetch("../api/canvas.json");
    // const canvasDB = await res1.json();

    // const users = await canvasDB.filter(x=>x.postId === postId)[0]["users"]
    
    
    let textInput = document.getElementById("text-input");
        
    socket.emit("login", userId);
    socket.on("receiveOnlineUsersAvatar", (users) => {
        document.getElementById("active-users-container").replaceChildren();
        for (const [user,avatar] of Object.entries(users)) {
            const image = document.createElement("img");
            image.src = avatar;
            image.classList.add("rounded-circle");
            image.classList.add("ml-3");
            image.width = 40;
            image.height = 40;
            image.id = user;
            document.getElementById("active-users-container").appendChild(image);
        }
    });
    socket.on("receiveNewUserAlert",(newUserName,newUserAvatar) => {
        const toast_avatar = document.getElementById("toast-user-avatar");
        const toast_user_name = document.getElementById("toast-user-name");
        const toast_message = document.getElementById("toast-message");
        toast_avatar.src = newUserAvatar;
        toast_user_name.innerHTML = newUserName;
        toast_message.innerHTML = `Watch out for the massive balls of ${newUserName} !`
        const alert = document.getElementById('new-user-alert');
        const boostrapToast = new bootstrap.Toast(alert);
        boostrapToast.show();
    })
    // const users = ["alpha","beta"];
    async function addChatElement(message, sender, isIncoming) {
      if(isIncoming && sender === userId){
        return;
    }
    const chatElement = document.createElement("div");
    const innerChat = document.createElement("div");
    const chatBox = document.getElementById("chat-texts");
    chatElement.classList.add("text");

    if(checkOnlyContainsMath(message)){
        innerChat.classList.add("math-text")
    }
    else{
        console.log("hid");
        // /([^\$\\])\$([^\$]+)\$/gm ==> regex for $ ... $
        // https://tex.stackexchange.com/questions/635501/regular-expression-in-texstudio
        message = (" " + message).replace(/([^\$\\])\$([^\$]+)\$/gm, '$1\\($2\\)').replace(/\r/g, '').slice(1);

        if(isIncoming){
            //Display user info in chat
            const usersDB = await api.fetchData('users');
            const user = usersDB.filter(x => x.email.toString() === sender.toString())[0];
            const imgElement = document.createElement("img");
            imgElement.src = user["avatar"];
            imgElement.crossOrigin = "anonymous";
            chatElement.appendChild(imgElement);
            const nameElement = document.createElement("span");
            nameElement.innerHTML = user.username;
            nameElement.classList.add("text-user-name");
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
    }
    innerChat.innerHTML = message;
    chatElement.appendChild(innerChat);
    chatBox.appendChild(chatElement);
    renderMathInElement(document.body);
    autoScroll();
}
  function checkOnlyContainsMath(message){
    const regexp1 = new RegExp(/\$\$(.*?)\$\$/g); // regexp for $$ .. $$
    const regexp2 = new RegExp(/\\\[(.*?)\\\]/g); // regex for \[ \]
    return regexp1.test(message) || regexp2.test(message);
  }
    

  function getUserChatColor(user) {
      if (!(user in userChatColor)) {
        userChatColor[user] = shuffle(chatColor)[0];
      }
      return userChatColor[user];
    }

    textInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (textInput.value === "") {
          return;
        }
        const payload = {
          sender: userId,
          message: textInput.value,
          receiver: postId,
        };

        socket.emit("chat-message", payload);
        addChatElement(textInput.value, userId, false);
        textInput.value = "";
      }
    });

    socket.on("chat-message", (payload) => {
      const { sender, message, receiver } = payload;
      if (parseInt(receiver) === postId) {
        addChatElement(message, sender, true);
      }
    });
  },
};

export function autoScroll() {
  const texts_container = document.getElementById("chat-texts");
  texts_container.scrollTop =
    texts_container.scrollHeight - texts_container.clientHeight;
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
