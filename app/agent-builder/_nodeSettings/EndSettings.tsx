import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function EndSettings({ selectedNode, updateFormData }: any) {
  const [formData, setFormData] = useState({ schema: "" });

  useEffect(() => {
    selectedNode && setFormData(selectedNode?.data.settings);
  }, [selectedNode]);

  return (
    <div>
      <h2 className="font-bold">End</h2>
      <p className="text-gray-500 mt-2">Choose the workflow output</p>
      <div className="mt-2 space-y-2">
        <Label>Output</Label>
        <Textarea
          value={formData?.schema}
          placeholder="{name:string}"
          onChange={(e) => setFormData({ schema: e.target.value })}
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

export default EndSettings;
