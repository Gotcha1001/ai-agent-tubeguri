import { Handle, Position } from "@xyflow/react";
import { Webhook } from "lucide-react";
import React from "react";

function ApiNode({ data }: any) {
  return (
    <div className="bg-white rounded-2xl p-2 px-3 border">
      <div className="flex gap-2 items-center">
        <Webhook className="p-2 rounded-lg h-8 w-8 bg-radial from-fuchsia-600 to-black" />
        <div className="flex flex-col ">
          <h2>{data?.label}</h2>
          <p className="text-sm text-gray-500">API</p>
        </div>

        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
}

export default ApiNode;
