import API_BASE_URL from "../consts/API";

const axios = require("axios").default;

async function login(params) {
  const url = API_BASE_URL + "accounts/login";
  try {
    const { data } = await axios.post(url, params);
    //let data = { account: { name: "Gevorg", id: "12313123" } };
    if (data.account) return data.account;
    else return null;
  } catch {
    return null;
  }
}

async function register(params) {
  const url = API_BASE_URL + "accounts/register";
  try {
    const { data } = await axios.put(url, params);
    if (data.account) {
      return data.account;
    } else return null;
  } catch {
    return null;
  }
}

async function updateProfile(params) {
  const url = API_BASE_URL + "accounts/user/update";
  try {
    const { data } = await axios.put(url, params);
    if (data.account) {
      return data.account;
    } else return null;
  } catch {
    return null;
  }
}

export default {
  login,
  register,
  updateProfile,
};
