import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
const BASE_URL = import.meta.env.BASE_URL;
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const setProfile = async () => {
    //clear the errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className="flex justify-center my-20 ">
        <div className="flex justify-center overflow-auto mx-10">
          <div className="card bg-base-300 w-96 shadow-sm p-5">
            <div className="card-body flex">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input mb-2"
                    placeholder="Type here"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input mb-2"
                    placeholder="Type here"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    value={age}
                    className="input mb-2"
                    placeholder="Type here"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    value={about}
                    className="input mb-2"
                    placeholder="Type here"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    value={gender}
                    className="input mb-2"
                    placeholder="Type here"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset ">
                  <legend className="fieldset-legend">PhotoUrl</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input mb-2"
                    placeholder="Type here"
                    onChange={(e) => setphotoUrl(e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="card-actions  justify-center">
                <button className="btn btn-primary" onClick={setProfile}>
                  Save Profile !!
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-info">
          <span>New mail arrived.</span>
        </div>
        <div className="alert alert-success">
          <span>{user.firstName} Profile saved successfully </span>
        </div>
      </div>}
    </>
  );
};
