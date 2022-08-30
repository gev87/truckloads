import API_BASE_URL from "../consts/API";
import { getUser } from "src/context/globalUtils";

const axios = require("axios").default;

async function addDriver(params) {
  const url = API_BASE_URL + "accounts/add/driver";
  try {
    const { data }  = await axios.post(url, params);
    // let data = { account: { name: "Gevorg", id: "12313123" } };
    if (data.account) return data.account;
    else return null;
  } catch {
    return null;
  }
}

async function getAllDrivers() {
  let orgId = getUser().organizationId;
  const url = API_BASE_URL + "accounts/all/drivers?organizationId=" + orgId;
  const { data }  = await axios.get(url);
  return data.drivers;
}

export { addDriver, getAllDrivers };
