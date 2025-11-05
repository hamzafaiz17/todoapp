import axios from "axios";
export default async function deleteTodos(apiEndpoint, id) {
  try {
    const response = await axios.delete(apiEndpoint + "todos/" + id);
    return response.data;
  } catch (error) {
    console.log("Error deleting todos:", error);
    return null;
  }
}
