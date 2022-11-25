export const api = {
  fetchData: async (data) => {
    // const URL = "https://cs326project.herokuapp.com/api/";
    const URL = "http://localhost:9000/api/"
    let response = await fetch(URL + data);
    if (response.ok) {
      return await response.json();
    }
  }
}
