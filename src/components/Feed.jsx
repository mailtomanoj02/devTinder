import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constants/BaseConstants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/FeedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const getFeed = async () => {
    try {
      // if (feed) {
      //   return;
      // }
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.users || []));

      console.log("==>res", response);
    } catch (e) {
      //
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="flex justify-center my-5">
      {feed ? <UserCard user={feed[0]} /> : null}
    </div>
  );
};

export default Feed;
