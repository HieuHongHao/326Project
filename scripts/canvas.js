
/*Chat is initiated by being at the bottom*/
const texts_container = document.getElementById("chat-texts");
texts_container.scrollTop = texts_container.scrollHeight - texts_container.clientHeight;