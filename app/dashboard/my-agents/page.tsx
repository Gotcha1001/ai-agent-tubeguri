import React from "react";
import MyAgents from "../_components/MyAgents";

function MyAgentPage() {
  return (
    <div className="p-10 bg-radial from-white to-black h-screen">
      <h2 className="font-bold text-3xl gradient-title">My Agents</h2>
      <MyAgents />
    </div>
  );
}

export default MyAgentPage;
