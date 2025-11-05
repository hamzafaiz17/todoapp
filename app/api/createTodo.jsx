import axios from "axios";
export default async function createTodo(apiEndpoint, todonew) {
  try {
    const response = await axios.post(apiEndpoint + "todos/", todonew);
    return response.data;
  } catch (error) {
    console.log("Error creating todo:", error);
    return null;
  }
}
