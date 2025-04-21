export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
  };

export const getAuther = () => {
  const token = localStorage.getItem("token");
  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

export const handleLoginSuccess = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  window.dispatchEvent(new Event("login"));
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("logout"));
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const response = await fetch("http://localhost:8000/profile", {
      method: "GET",
      headers: {
        ...getAuther(),
      },
    });

    return response.ok;
  } catch (err) {
    console.error("Token verification failed:", err);
    return false;
  }
};
