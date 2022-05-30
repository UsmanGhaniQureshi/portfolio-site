import { useRef } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../store/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

const LoginPage = () => {
  const passwordRef = useRef(null);
  const { loading, user, onLogin } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    onLogin(password);
  };
  if (loading) return <LoadingSpinner />;
  else if (!loading && user) return <Navigate to="/dashboard" />;
  else
    return (
      <form onSubmit={submitHandler}>
        <input type="password" ref={passwordRef} />
        <button type="submit">Login</button>
      </form>
    );
};

export default LoginPage;
