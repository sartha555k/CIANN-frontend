import axios from "axios";
import React, { useEffect } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const req = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return;
  }
  if (requests.length == 0) {
    return <h1 className="flex justify-center text-bold text-2xl py-25">No requests found !!</h1>;
  }
  return (
    <div className="text-center my-20">
      <h1 className="font-bold text-3xl underline">REQUESTS</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 border rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-8">
              <h2 className="font-bold text-2xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => reviewRequest("accepted", request._id)}
                className="btn btn-lg hover:bg-blue-400"
              >
                Accept
              </button>
              <button
                onClick={() => reviewRequest("rejected", request._id)}
                className="btn btn-lg hover:bg-red-500"
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
