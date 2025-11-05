import axios from "axios";
export default async function getTodos(apiEndpoint) {
  try {
    const response = await axios.get(apiEndpoint + "todos/");
    // console.log("Fetched todos:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching todos:", error);
    return [];
  }
}
