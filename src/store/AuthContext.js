import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext({
  loading: true,
  user: null,
  message: "",
  onLogin: () => {},
  onLogout: () => {},
});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loginHandler = async (password) => {
    const auth = getAuth();
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        "musmanghani2000@gmail.com",
        password
      );
      if (result.user) {
        setLoading(false);
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false);
      return () => unsub();
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, loading, message, onLogin: loginHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
