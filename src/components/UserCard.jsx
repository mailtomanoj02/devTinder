import React from "react";
import { removeFeed } from "../redux/FeedSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants/BaseConstants";

function UserCard({ user }) {
  const { _id, firstName, lastName, gender, photoUrl, age } = user || {};
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const handleFeed = async (status, id) => {
    try {
      const response = await axios.post(
        BASE_URL + `/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id));
    } catch (e) {
      console.log("error==>", e);
    }
  };
  if (feed?.length <= 0) return <h1>No feed</h1>;

  if (!feed) {
    return null;
  }
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src="https://avatar.iran.liara.run/public/boy?username=Ash"
          alt="User Avatar"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p className="text-white">{age}</p>
        <p className="text-white">{gender}</p>
        <div className="card-actions flex justify-evenly">
          <button
            className="btn btn-primary flex-1 mx-2"
            onClick={() => handleFeed("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary flex-1 mx-2"
            onClick={() => handleFeed("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
