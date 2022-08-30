const USER_SESSION_KEY = "user_session";

const saveUser = function (user) {
  user = JSON.stringify(user);
  localStorage.setItem(USER_SESSION_KEY, user);
};

const getUser = () => {
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) {
    let result = localStorage.getItem(USER_SESSION_KEY);
    return JSON.parse(result);
  }
};

const removeUser = function () {
  return localStorage.setItem(USER_SESSION_KEY, null);
};

const updateUser = (phone, zoom) => {
  let result = localStorage.getItem(USER_SESSION_KEY);
  let user = JSON.parse(result);
  user.phone = phone;
  user.zoom = zoom;
  user = JSON.stringify(user);
  localStorage.setItem(USER_SESSION_KEY, user);
};//i dont use this



export { saveUser, getUser, removeUser, updateUser };
