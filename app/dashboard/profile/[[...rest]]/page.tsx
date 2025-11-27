import { UserProfile } from "@clerk/nextjs";
import React from "react";

function Profile() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl gradient-title">Profile</h2>
      <UserProfile />
    </div>
  );
}

export default Profile;
