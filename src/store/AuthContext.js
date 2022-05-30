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
  onLogin: () => {},
  onLogout: () => {},
});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
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
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
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
    <AuthContext.Provider value={{ user, loading, onLogin: loginHandler }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
