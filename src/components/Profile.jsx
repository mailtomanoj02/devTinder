import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../constants/BaseConstants";
import { addUser } from "../redux/UserSlice";

const Profile = () => {
  const user = useSelector((store) => store.user.user);
  const [firstName, setFirstName] = React.useState(user?.firstName);
  const [lastName, setLastName] = React.useState(user?.lastName);
  const [age, setAge] = React.useState(user?.age);
  const [gender, setGender] = React.useState(user?.gender);
  const [error, setError] = React.useState("");
  const dispatch = useDispatch();
  const handleEdit = async () => {
    try {
      const response = await axios.patch(
        BASE_URL + "/profile",
        { firstName, lastName, age, gender },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      dispatch(addUser(response?.data?.user));
      setError("");
      console.log(response);
    } catch (e) {
      setError(e.response.data);
    }
  };
  return (
    <div className="card card-dash bg-base-200 w-96 justify-self-center my-10">
      <div className="card-body">
        <h2 className="card-title justify-center">Edit Profile</h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">First Name</legend>
          <input
            type="text"
            className="input border-bg-base"
            placeholder="Enter your email"
            value={firstName}
            onChange={(e) => {
              if (error) {
                setError("");
              }
              setFirstName(e.target.value);
            }}
          />
        </fieldset>
        <fieldset className="fieldset ">
          <legend className="fieldset-legend">Last Name</legend>
          <input
            type="text"
            className="input"
            placeholder="Enter your password"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset ">
          <legend className="fieldset-legend">Age</legend>
          <input
            type="text"
            className="input"
            placeholder="Enter your password"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset ">
          <legend className="fieldset-legend">Gender</legend>
          <input
            type="text"
            className="input"
            placeholder="Enter your password"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </fieldset>
        {error ? <p className="text-red-500">{error}</p> : null}

        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={handleEdit}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
