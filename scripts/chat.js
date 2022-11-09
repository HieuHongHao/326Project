export const chat = {
    init: async () => {
        
    }
}

export function autoScroll(){
    const texts_container = document.getElementById("chat-texts");
    texts_container.scrollTop = texts_container.scrollHeight - texts_container.clientHeight;
}
  