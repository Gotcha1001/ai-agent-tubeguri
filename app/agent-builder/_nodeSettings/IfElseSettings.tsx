import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function IfElseSettings({ selectedNode, updateFormData }: any) {
  const [formData, setFormData] = useState({ ifCondition: "" });

  useEffect(() => {
    selectedNode && setFormData(selectedNode?.data.settings);
  }, [selectedNode]);

  return (
    <div>
      <h2 className="font-bold">If / Else</h2>
      <p className="text-gray-500 mt-2">
        Create conditions to branch your workflow
      </p>
      <div className="mt-3">
        <Label>If</Label>
        <Input
          value={formData?.ifCondition}
          onChange={(e) => setFormData({ ifCondition: e.target.value })}
          className="mt-2"
          placeholder="Enter condition e.g output==`any condition`"
        />
      </div>
      <Button
        onClick={() => {
          updateFormData(formData);
          toast.success("Updated");
        }}
        className="w-full mt-5"
      >
        Save
      </Button>
    </div>
  );
}

export default IfElseSettings;
