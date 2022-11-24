export const api = {
  fetchData: async (data) => {
    const URL = "https://cs326project.herokuapp.com/api/";
    let response = await fetch(URL + data);
    if (response.ok) {
      return await response.json();
    }
  }
}
