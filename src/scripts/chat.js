import { api } from "./api.js";

export const chat = {
  init: async (socket) => {
    // const socket = io("/");
    
    
    const chatColor = ["blue", "green", "yellow", "red", "purple"]; //Availalbe colors
    const userChatColor = {}; // Dictionary that maps user to a color randomly selected from chatColor
    const user = await api.isLoggedIn();
    const userId = user.id;
    const canvasId = new URLSearchParams(window.location.search).get("");

    const textInput = document.getElementById("text-input");
    
    socket.emit("login", userId, canvasId);
    socket.on("receiveOnlineUsersAvatar", (users) => {
      // document.getElementById("active-users-container").replaceChildren();
      for (const user of users) {
        if(document.getElementById(user.id)){
          continue;
        }
        const image = document.createElement("img");
        image.src = user.avatar;
        image.classList.add("rounded-circle");
        image.classList.add("ml-3");
        image.width = 40;
        image.height = 40;
        image.id = user.id;
        document.getElementById("active-users-container").appendChild(image);
      }
    });
    socket.on("receiveNewUserAlert", (user) => {
      const toast_avatar = document.getElementById("toast-user-avatar");
      const toast_user_name = document.getElementById("toast-user-name");
      const toast_message = document.getElementById("toast-message");
      toast_avatar.src = user.avatar;
      toast_user_name.innerHTML = user.username;
      toast_message.innerHTML = `${user.username} just joined`;
      const alert = document.getElementById("new-user-alert");
      const boostrapToast = new bootstrap.Toast(alert);
      boostrapToast.show();
    });
    socket.on("deleteLeftUser", (username) => {
      const leftUserAvatar = document.getElementById(username);
      if (leftUserAvatar) {
        document
          .getElementById("active-users-container")
          .removeChild(leftUserAvatar);
      }
    });
    async function addChatElement(message, sender, isIncoming) {
      if (isIncoming && sender === userId) {
        return;
      }
      const chatElement = document.createElement("div");
      const innerChat = document.createElement("div");
      const chatBox = document.getElementById("chat-texts");
      chatElement.classList.add("text");

      if (checkOnlyContainsMath(message)) {
        innerChat.classList.add("math-text");
      } else {
        // regex for $ ... $
        // https://tex.stackexchange.com/questions/635501/regular-expression-in-texstudio
        message = (" " + message)
          .replace(/([^\$\\])\$([^\$]+)\$/gm, "$1\\($2\\)")
          .replace(/\r/g, "")
          .slice(1);
        if (isIncoming) {
          //Display user info in chat
          const senderProfile = await api.fetchGET(
            "api/users/" + sender.toString()
          );
          const imgElement = document.createElement("img");
          imgElement.src = senderProfile.avatar;
          imgElement.crossOrigin = "anonymous";
          chatElement.appendChild(imgElement);
          const nameElement = document.createElement("span");
          nameElement.innerHTML = senderProfile.username;
          nameElement.classList.add("text-user-name");
          chatElement.appendChild(nameElement);
          //User chat color
          innerChat.classList.add(
            getUserChatColor(sender.toString()) + "-text"
          );
        } else {
          const dummyText = document.createElement("div");
          dummyText.classList.add("text-dummy");
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

    function checkOnlyContainsMath(message) {
      const regexp1 = new RegExp(/\$\$(.*?)\$\$/g); // regex for $$ .. $$
      const regexp2 = new RegExp(/\\\[(.*?)\\\]/g); // regex for \[ \]
      return regexp1.test(message) || regexp2.test(message);
    }

    function getUserChatColor(user) {
      if (!(user in userChatColor)) {
        userChatColor[user] = shuffle(chatColor)[0];
      }
      return userChatColor[user];
    }

    /*Send message when press enter in chat*/
    textInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (textInput.value === "") {
          return;
        }

        const payload = {
          sender: userId,
          message: textInput.value,
          receiver: canvasId,
        };

        socket.emit("chat-message", payload);
        addChatElement(textInput.value, userId, false);
        textInput.value = "";
      }
    });

    /*Receive message from socket*/
    socket.on("chat-message", (payload) => {
      const { sender, message, receiver } = payload;
      if (receiver.toString() === canvasId.toString()) {
        //If it's in the right canvas room
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
