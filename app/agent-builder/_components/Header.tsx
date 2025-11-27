import { Button } from "@/components/ui/button";
import { Agent } from "@/types/AgentType";
import { ChevronLeft, Code2, Play, X } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  agentDetail: Agent | undefined;
  previewHeader?: boolean;
  onPublish: () => void;
};

function Header({ agentDetail, previewHeader = false, onPublish }: Props) {
  return (
    <div className="w-full p-3 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <ChevronLeft className="w-8 h-8" />
        <h2 className="text-2xl gradient-title">{agentDetail?.name}</h2>
      </div>
      <div className="flex items-center gap-3">
        <Button variant={"sex3"}>
          <Code2 /> Code
        </Button>
        {!previewHeader ? (
          <Link href={`/agent-builder/${agentDetail?.agentId}/preview`}>
            <Button variant={"sex4"}>
              <Play /> Preview
            </Button>
          </Link>
        ) : (
          <Link href={`/agent-builder/${agentDetail?.agentId}`}>
            <Button variant={"sex4"}>
              <X /> Close Preview
            </Button>
          </Link>
        )}

        <Button onClick={onPublish} variant={"sex5"}>
          Publish
        </Button>
      </div>
    </div>
  );
}

export default Header;
