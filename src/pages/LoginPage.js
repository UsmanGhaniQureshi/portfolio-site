import { useRef } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../store/AuthContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

const LoginPage = () => {
  const passwordRef = useRef(null);
  const { loading, message, user, onLogin } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    onLogin(password);
  };

  const forgetPasswordHandler = () => {
    console.log("Forget Password");
  };
  if (loading) return <LoadingSpinner />;
  else if (!loading && user) return <Navigate to="/dashboard" />;

  return (
    <div className="flex w-full flex-col gap-5 h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Portfolio Login</h1>
      {message && <p className="text-red-700 text-xs max-w-lg ">{message}</p>}
      <form
        className="flex w-full flex-col gap-3 px-3 py-2 max-w-md mx-auto"
        onSubmit={submitHandler}
      >
        <input
          className="border  outline-none px-4 py-2 rounded-xl"
          type="password"
          ref={passwordRef}
        />
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={forgetPasswordHandler}
            className="bg-slate-900 text-slate-100 font-bold px-4 py-2 rounded-lg"
          >
            Forget Password
          </button>
          <button
            type="submit"
            className="bg-green-700 text-slate-100 font-bold px-4 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
