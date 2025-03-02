// Check if the user is logged in
export const isAuthenticated = (): boolean => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isLoggedIn") === "true";
  }
  return false;
};

// Redirect user to login page if not authenticated
export const handleAuth = () => {
  if (typeof window !== "undefined" && !isAuthenticated()) {
    window.location.href = "/auth/login";
  }
};

export const successLogIn = () => {
  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "/";
};

export const logOut = () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "/auth/login";
};
