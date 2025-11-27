"use client";
import FeatureMotionWrapper from "@/app/components/FramerMotion/FeatureMotionWrapper";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { Agent } from "@/types/AgentType";
import { useConvex } from "convex/react";
import { GitBranchIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";

function MyAgents() {
  const { userDetail } = useContext(UserDetailContext);
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const convex = useConvex();

  useEffect(() => {
    userDetail && GetUserAgents();
  }, [userDetail]);

  const GetUserAgents = async () => {
    const result = await convex.query(api.agent.GetUserAgents, {
      userId: userDetail?._id,
    });
    console.log("AGENT FETCH:", result);
    setAgentList(result);
  };
  return (
    <div className="w-full mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {agentList.map((agent, index) => (
          <div className="" key={index}>
            <FeatureMotionWrapper index={index}>
              <div className="p-3 border rounded-lg shadow hover:bg-radial from-purple-500 to-indigo-900">
                <Link href={"/agent-builder/" + agent.agentId}>
                  <GitBranchIcon className="bg-radial from-indigo-500 to-teal-500 p-2 rounded-sm h-8 w-8" />
                  <h2 className="mt-3">{agent.name}</h2>
                  <h2 className="text-sm text-gray-400 mt-2">
                    {moment(agent._creationTime).fromNow()}
                  </h2>
                </Link>
              </div>
            </FeatureMotionWrapper>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAgents;
