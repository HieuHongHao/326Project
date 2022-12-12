const ENV = "not_local";

export function getURL() {
  if (ENV === "local") {
    return "http://localhost:9000/";
  }
  return "https://cs326project.herokuapp.com/";
}

const URL = getURL();
export const api = {
  fetchGET: async (url) => {
    let response = await fetch(URL + url);
    if (response.ok) {
      return await response.json();
    }
  },

  fetchPOST: async (url, body) => {
    const response = await fetch(URL + url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    return await response.json();
  },

  fetchPUT: async (url, body) => {
    const response = await fetch(URL + url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    return await response.json();
  },

  // Return user if they are logged in, otherwise return undefined
  isLoggedIn: async () => {
    const token = window.localStorage.getItem("token");
    let user;
    await fetch(URL + "user/me", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
      redirect: 'follow'
    }).then(response => {
      if (response.status !== 200) {
        window.localStorage.removeItem("token");
        return undefined;
      } else {
        return response.json();
      }
    }).then(result => {
      user = result;
    });
    return user;
  }
}
