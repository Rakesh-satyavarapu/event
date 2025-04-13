// utils/auth.js

export const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.role : null;
  };
  