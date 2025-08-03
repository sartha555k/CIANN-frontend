import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginFrom, setLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailID,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      //console.log(err);
    }
  };
  const handleSignUp = async () => {
    try{
    const res = await axios.post(
      BASE_URL + "/signup",
      { firstName, lastName, emailID, password },
      { withCredentials: true }
    );
    dispatch(addUser(res.data.data));
    navigate("/profile")
  }catch(err){
     setError(err?.response?.data || "Something went wrong");
  }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body flex">
          <h2 className="card-title justify-center">
            {isLoginFrom ? "LOGIN" : "SIGNUP"}
          </h2>
          <div>
            {!isLoginFrom && (
              <>
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    placeholder="Type here"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    placeholder="Type here"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}

            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                value={emailID}
                className="input"
                placeholder="Type here"
                onChange={(e) => setEmailID(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                className="input"
                placeholder="Type here"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions  justify-center">
            <button
              className="btn btn-primary "
              onClick={isLoginFrom ? handleLogin : handleSignUp}
            >
              {isLoginFrom ? "LOGIN" : "SIGNUP"}
            </button>
          </div>
          <p
            className="text-blue-300"
            onClick={() => setLoginForm((value) => !value)}
          >
            {isLoginFrom ? "New User? Sign Up" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
