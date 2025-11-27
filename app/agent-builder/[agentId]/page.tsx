"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import Header from "../_components/Header";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  MiniMap,
  Controls,
  Panel,
  useOnSelectionChange,
  OnSelectionChangeParams,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import StartNode from "../_customNodes/StartNode";
import AgentNode from "../_customNodes/AgentNode";

import { WorkflowContext } from "@/context/WorkflowContext";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Agent } from "@/types/AgentType";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import EndNode from "../_customNodes/EndNode";
import IfElseNode from "../_customNodes/IfElseNode";
import WhileNode from "../_customNodes/WhileNode";
import UserApprovalNode from "../_customNodes/UserApprovalNode";
import ApiNode from "../_customNodes/ApiNode";
import SettingPanel from "../_components/SettingPanel";
import AgentToolsPanel from "../_components/AgentToolsPanel";

const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

export const nodeTypes = {
  StartNode: StartNode,
  AgentNode: AgentNode,
  EndNode: EndNode,
  IfElseNode: IfElseNode,
  WhileNode: WhileNode,
  UserApprovalNode: UserApprovalNode,
  ApiNode: ApiNode,
};

function AgentBuilder() {
  const [agentDetail, setAgentDetail] = useState<Agent>();
  const { agentId } = useParams();
  const {
    addedNodes,
    setAddedNodes,
    nodeEdges,
    setNodeEdges,
    setSelectedNode,
  } = useContext(WorkflowContext);
  const convex = useConvex();
  const UpdateAgentDetail = useMutation(api.agent.UpdateAgentDetail);

  const hasLoadedFromDB = useRef(false);

  useEffect(() => {
    GetAgentDetail();
  }, []);

  const SaveNodesAndEdges = async () => {
    console.log("=== SAVING TO DATABASE ===");
    console.log("Nodes being saved:", addedNodes);
    console.log(
      "Agent node with settings:",
      addedNodes.find((n: any) => n.type === "AgentNode")
    );
    await UpdateAgentDetail({
      //@ts-ignore
      id: agentDetail?._id,
      edges: nodeEdges,
      nodes: addedNodes,
    });
    toast.success("Saved successfully!");
  };

  const GetAgentDetail = async () => {
    const result = await convex.query(api.agent.GetAgentById, {
      agentId: agentId as string,
    });
    setAgentDetail(result);
  };

  // Load saved data from database ONCE when component mounts
  useEffect(() => {
    if (agentDetail && !hasLoadedFromDB.current) {
      const savedNodes = agentDetail.nodes || [];
      const savedEdges = agentDetail.edges || [];

      setAddedNodes(savedNodes);
      setNodeEdges(savedEdges);

      hasLoadedFromDB.current = true;
    }
  }, [agentDetail, setAddedNodes, setNodeEdges]);

  const onNodesChange = useCallback(
    (changes: any) => {
      const updated = applyNodeChanges(changes, addedNodes);
      setAddedNodes(updated);
    },
    [addedNodes, setAddedNodes]
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      const updated = applyEdgeChanges(changes, nodeEdges);
      setNodeEdges(updated);
    },
    [nodeEdges, setNodeEdges]
  );

  const onConnect = useCallback(
    (params: any) => {
      const updated = addEdge(params, nodeEdges);
      setNodeEdges(updated);
    },
    [nodeEdges, setNodeEdges]
  );

  const onNodeSelect = useCallback(
    ({ nodes, edges }: OnSelectionChangeParams) => {
      setSelectedNode(nodes[0]);
      console.log("NODES:", nodes[0]);
    },
    []
  );

  useOnSelectionChange({
    onChange: onNodeSelect,
  });

  return (
    <div>
      <Header agentDetail={agentDetail} />
      <div style={{ width: "100vw", height: "90vh" }}>
        <ReactFlow
          nodes={addedNodes}
          edges={nodeEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          {/* @ts-ignore */}
          <Background variant="dots" gap={12} size={1} />
          <Panel position="top-left">
            <AgentToolsPanel />
          </Panel>
          <Panel position="top-right">
            <SettingPanel />
          </Panel>
          <Panel position="bottom-center">
            <Button onClick={SaveNodesAndEdges}>
              <Save /> Save
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default AgentBuilder;
