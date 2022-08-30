import API_BASE_URL from "../consts/API";

const axios = require("axios").default;
async function randomLoads() {
  const url = API_BASE_URL + "loads/search/random";
  try {
      const { data }  = await axios.get(url);
      //let data = { account: { name: "Gevorg", id: "441156332" } };
      if (data.loads) {
          return data.loads;
      }
    else return null;
  } catch {
    return null;
  }
}

export default {
  randomLoads,
};