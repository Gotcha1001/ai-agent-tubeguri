import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function WhileSettings({ selectedNode, updateFormData }: any) {
  const [formData, setFormData] = useState({ whileCondition: "" });

  useEffect(() => {
    selectedNode && setFormData(selectedNode?.data.settings);
  }, [selectedNode]);

  return (
    <div>
      <h2 className="font-bold">While</h2>
      <p className="text-gray-500 mt-2">Loop Your Logic</p>
      <div className="mt-3">
        <Label>While</Label>
        <Input
          value={formData?.whileCondition}
          onChange={(e) => setFormData({ whileCondition: e.target.value })}
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

export default WhileSettings;
