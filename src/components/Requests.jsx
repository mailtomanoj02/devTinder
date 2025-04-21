import React, { useEffect } from "react";
import { addrequests } from "../redux/RequestSlice";
import axios from "axios";
import { BASE_URL } from "../constants/BaseConstants";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  console.log(requests, "manoj");

  const reviewRequest = async (status, id) => {
    try {
      const response = await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      getRequests();
      console.log("response==>", response);
    } catch (e) {}
  };

  const getRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addrequests(response?.data?.data));
      console.log(response);
    } catch (e) {
      console.log("catch==>", e);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  if (!requests || requests?.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        No Requests found
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      {requests?.map((user) => (
        <div
          key={user.id}
          className="card bg-base-300 shadow-sm w-96 flex-row p-2"
        >
          <figure>
            <img
              className="w-50 h-50 object-cover"
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {`${user?.fromUserId?.firstName} ${user?.fromUserId?.lastName}`}
            </h2>
            <p>{`${user?.fromUserId?.age}, ${user?.fromUserId?.gender}`}</p>
            <div className="flex flex-row justify-start gap-2 mt-2">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("accepted", user._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("rejected", user._id)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
