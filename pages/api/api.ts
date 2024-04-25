// api.ts
import axios from "axios";

const API_URL = "http://34.71.62.191:80/api/deployments";

const scaledObject = async (path: string) => {
  try {
    console.log(">>> api call address: ", `${API_URL}`);
    const response = await axios.get(`${API_URL}`);
    console.log(">>> response data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error: ", error);
    throw new Error("Failed to fetch data from API");
  }
};

export default scaledObject;


