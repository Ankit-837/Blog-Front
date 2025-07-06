import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  const [isLogin, setIsLogin] = useState(() =>
    localStorage.getItem("token") ? true : false
  );

  // Optional: Update localStorage when user or token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setIsLogin(true);
    } else {
      localStorage.removeItem("token");
      setIsLogin(false);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
