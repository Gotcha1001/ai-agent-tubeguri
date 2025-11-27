import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileJson } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function UserApproval({ selectedNode, updateFormData }: any) {
  const [formData, setFormData] = useState({ name: "", message: "" });

  useEffect(() => {
    selectedNode && setFormData(selectedNode?.data.settings);
  }, [selectedNode]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSave = () => {
    console.log("Formdata:", formData);
    updateFormData(formData);
    toast.success("Settings Updated");
  };

  return (
    <div>
      <h2 className="font-bold">User Approval</h2>
      <p className="text-gray-500 mt-2">
        Pause for a human to approve or reject a step
      </p>
      <div className="mt-3 space-y-1">
        <Label>Name</Label>
        <Input
          value={formData?.name}
          placeholder="Name"
          onChange={(event) => handleChange("name", event.target.value)}
        />
      </div>
      <div className="mt-3 space-y-1">
        <Label>Message</Label>
        <Textarea
          value={formData?.message}
          placeholder="Describe the message to show to the user"
          onChange={(event) => handleChange("message", event.target.value)}
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

export default UserApproval;
