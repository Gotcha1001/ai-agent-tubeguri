"use client";
import React, { useEffect, useState } from "react";
import Header from "../../_components/Header";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Agent } from "@/types/AgentType";
import { Background, ReactFlow } from "@xyflow/react";
import { nodeTypes } from "../page";
import "@xyflow/react/dist/style.css";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "lucide-react";
import ChatUi from "./_components/ChatUi";
import PublishCodeDialog from "./_components/PublishCodeDialog";

function PreviewAgent() {
  const [agentDetail, setAgentDetail] = useState<Agent>();
  const [flowConfig, setFlowConfig] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const convex = useConvex();
  const { agentId } = useParams();
  const updateAgentToolConfig = useMutation(api.agent.UpdateAgentToolConfig);

  useEffect(() => {
    GetAgentDetail();
  }, []);
  const GetAgentDetail = async () => {
    const result = await convex.query(api.agent.GetAgentById, {
      agentId: agentId as string,
    });
    setAgentDetail(result);

    //Get conversation ID if not present
    const conversationIdResult = await axios.get("/api/agent-chat");
    console.log("CONVERSATIONID:", conversationIdResult.data);
    setConversationId(conversationIdResult.data);
  };

  useEffect(() => {
    if (agentDetail) {
      GenerateWorkflow();
    }
  }, [agentDetail]);

  const GenerateWorkflow = () => {
    //Build Edge Map (for quick lookup)
    const edgeMap = agentDetail?.edges?.reduce((acc: any, edge: any) => {
      if (!acc[edge.source]) acc[edge.source] = [];
      acc[edge.source].push(edge);
      return acc;
    }, {});

    //Build Flow Configuration
    const flow = agentDetail?.nodes?.map((node: any) => {
      const connectedEdges = edgeMap[node.id] || [];
      let next: any = null;

      switch (node.type) {
        //conditional branching
        case "IfElseNode": {
          const ifEdge = connectedEdges.find(
            (e: any) => e.sourceHandle === "if"
          );
          const elseEdge = connectedEdges.find(
            (e: any) => e.sourceHandle === "else"
          );
          next = {
            if: ifEdge?.target || null,
            else: elseEdge?.target || null,
          };
          break;
        }
        // Agent or AI node
        case "AgentNode": {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          } else if (connectedEdges.length > 1) {
            next = connectedEdges.map((e: any) => e.target);
          }
          break;
        }
        //API call node
        case "ApiNode": {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          }
          break;
        }
        //User Approval Node(manual checkpoint)
        case "UserApprovalNode": {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          }
          break;
        }
        //Start Node
        case "StartNode": {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          }
          break;
        }
        //End Node
        case "EndNode": {
          next = null; // No next node
          break;
        }
        // Default handling
        default: {
          if (connectedEdges.length === 1) {
            next = connectedEdges[0].target;
          } else if (connectedEdges.length > 1) {
            next = connectedEdges.map((e: any) => e.target);
          }
          break;
        }
      }
      return {
        id: node.id,
        type: node.type,
        label: node.data?.label || node.type,
        setttings: node.data?.settings || {},
        next,
      };
    });
    // Identify start node
    const startNode = agentDetail?.nodes?.find(
      (n: any) => n.type === "StartNode"
    );
    //Final config
    const config = {
      startNode: startNode?.id || null,
      flow,
    };

    setFlowConfig(config);
    console.log("FLOW Generated Workflow Config", JSON.stringify(config));
    //setConfig(config)
  };

  const GenerateAgentToolConfig = async () => {
    setLoading(true);
    const result = await axios.post("/api/generate-agent-tool-config", {
      jsonConfig: flowConfig,
    });

    console.log("API:", result.data);
    //Update to our DB
    await updateAgentToolConfig({
      id: agentDetail?._id as any,
      agentToolConfig: result.data,
    });
    GetAgentDetail();
    setLoading(false);
  };

  const onPublish = () => {
    setOpenDialog(true);
  };

  return (
    <div>
      <Header
        agentDetail={agentDetail}
        previewHeader={true}
        onPublish={onPublish}
      />
      <div className="grid grid-cols-4">
        <div className="col-span-3 p-5 border rounded-2xl m-5">
          <h2>Preview</h2>
          <div style={{ width: "100%", height: "90vh" }}>
            <ReactFlow
              nodes={agentDetail?.nodes || []}
              edges={agentDetail?.edges || []}
              fitView
              nodeTypes={nodeTypes}
              draggable={false}
            >
              {/* @ts-ignore */}
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
        </div>
        <div className="col-span-1 border rounded-2xl m-5 p-5">
          <div className="flex items-centter justify-center h-full">
            {!agentDetail?.agentToolConfig ? (
              <Button disabled={loading} onClick={GenerateAgentToolConfig}>
                <RefreshCwIcon className={`${loading && "animate-spin"}`} />
                Reboot Agent
              </Button>
            ) : (
              <ChatUi
                GenerateAgentToolConfig={GenerateAgentToolConfig}
                loading={loading}
                agentDetail={agentDetail}
                conversationId={conversationId}
              />
            )}
          </div>
        </div>
      </div>
      <PublishCodeDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
}

export default PreviewAgent;
