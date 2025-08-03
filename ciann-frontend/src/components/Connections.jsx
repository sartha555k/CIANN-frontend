import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectioinSlice";
import {Link} from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return;
  }
  if (connections.length == 0) {
    return <h1 className="text-bold text-2xl">No connections found !!</h1>;
  }

  return (
    <div className="text-center my-20">
      <h1 className="font-bold text-3xl underline">CONNECTIONS</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, about, photoUrl } =
          connection;
        return (
          <div className=" flex m-4 p-4 border rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left flex-grow mx-8">
              <h2 className="font-bold text-2xl">
                {firstName + " " + lastName}
              </h2>
              {<p className="font-bold">{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <Link to={"/chat/" + _id}>
              <button
                type="button"
                className="btn btn-primary ml-auto"
              >chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
