import axios from "axios";
export default async function updateTodos(apiEndpoint, status, id) {
  try {
    const response = await axios.put(apiEndpoint + "todos/" + id, status);
    return response.data;
  } catch (error) {
    console.log("Error updating todo:", error);

    return null;
  }
}
