import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constants/BaseConstants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/ConnectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const getConnections = async () => {
    try {
      const connections = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(connections?.data?.data));
      console.log(connections);
    } catch (e) {}
  };
  useEffect(() => {
    getConnections();
  }, []);
  if (!connections || connections?.length === 0)
    return (
      <div className="flex justify-center items-center h-full">
        No Connections found
      </div>
    );
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      {connections?.map((user) => (
        <div key={user.id} className="card bg-base-100 shadow-sm w-96 flex-row">
          <figure>
            <img
              className="w-50 h-50 object-cover"
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {`${user.firstName} ${user.lastName}`}
            </h2>
            <p>{`${user?.age}, ${user?.gender} `}</p>
            {/* <div className="card-actions justify-center flex-row">
              <button className="btn btn-primary">Accept</button>
              <button className="btn btn-secondary">Watch</button>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
