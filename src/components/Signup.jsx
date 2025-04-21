import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/UserSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../constants/BaseConstants";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = React.useState("manoj.s@foodhub.com");
  const [password, setPassword] = React.useState("2success");
  const [error, setError] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensures cookies are sent with the request
        }
      );

      console.log("Signup successful:", response.data);
      dispatch(addUser(response.data?.data));
      navigate("/");
    } catch (error) {
      console.log("called==>", error);
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="card card-dash bg-base-200 w-96 justify-self-center my-10">
      <div className="card-body">
        <h2 className="card-title justify-center">Signup</h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="text"
            className="input border-bg-base"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              if (error) {
                setError("");
              }
              setEmail(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="fieldset ">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="text"
            className="input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        {error ? <p className="text-red-500">{error}</p> : null}

        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={handleLogin}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
