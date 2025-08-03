import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

function Feed() {
  const feed = useSelector((store) => store.feed);
  //console.log(feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      //console.log(res.data.data)
      dispatch(addfeed(res.data.data));
    } catch (err) {
      //todo}
    }
  };

  useEffect(() => {
    getFeed();
  }, [feed]);
  if(!feed){
    return ;
  }
  if(feed.length <= 0)return <h1 className="flex justify-center py-30">No yours found !!!!</h1>
  return (
    feed?.[0] && (
      <div className="flex justify-center my-20">
        <UserCard user={feed[0]} />
      </div>
    )
  );
}

export default Feed;
