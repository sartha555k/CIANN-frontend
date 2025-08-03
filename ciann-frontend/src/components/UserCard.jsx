import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removefeed } from "../utils/feedSlice";
const UserCard = ({ user }) => {
  //console.log(user);
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removefeed(userId));
    } catch (err) {}
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="photo " />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-4xl mb-1">
          {firstName + " " + lastName}
        </h2>
        {age && gender && (
          <p className="text-2xl mb-1">{age + " , " + gender}</p>
        )}
        <p className="">{about}</p>
        <div className="card-actions justify-center my-3">
          <button className="btn btn-secondary"  onClick={() => handleSendRequest("interested", _id)}>Interested</button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ingored
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
