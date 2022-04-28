import axios from "axios";

export const base = axios.create({
  baseURL: `https://api.dictionaryapi.dev/api/v2/entries/en/`,
});
