import axios from "axios";
import { API_HOST } from "../utils/constants";

export async function getWordApi(word) {
  try {
    const url = `${API_HOST}/${word}`;
    // console.log(">>> URL", url);
    const data = await axios.get(url);
    return data;
  } catch (e) {
    return { data: "error" };
    console.error(e);
  }
}
