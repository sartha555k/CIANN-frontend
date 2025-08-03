import React from "react";
import { EditProfile } from "./EditProfile";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((store) => store.user);
  return user &&(
    <div>
      <EditProfile user = {user}/>
    </div>
  );
  
}

export default Profile;
